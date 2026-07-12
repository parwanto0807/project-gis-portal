import prisma from '../config/prisma.js';
import bcrypt from 'bcryptjs';
import { generateTokens } from '../utils/jwt.js';
import { OAuth2Client } from 'google-auth-library';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ─── Brute-Force Protection ──────────────────────────────────────────────
const loginAttempts = new Map(); // key → { count, lockedUntil }
const MAX_ATTEMPTS = 5;
const LOCK_DURATION_MS = 5 * 60 * 1000; // 5 menit

const checkLoginAttempts = (identifier) => {
  const record = loginAttempts.get(identifier);
  if (!record) return null;
  if (record.lockedUntil && Date.now() < record.lockedUntil) {
    const remaining = Math.ceil((record.lockedUntil - Date.now()) / 1000);
    return remaining; // masih terkunci
  }
  if (record.lockedUntil && Date.now() >= record.lockedUntil) {
    loginAttempts.delete(identifier); // expired, reset
  }
  return null;
};

const recordFailedAttempt = (identifier) => {
  const record = loginAttempts.get(identifier) || { count: 0 };
  record.count += 1;
  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = Date.now() + LOCK_DURATION_MS;
  }
  loginAttempts.set(identifier, record);
  return MAX_ATTEMPTS - record.count; // remaining attempts
};

const resetLoginAttempts = (identifier) => {
  loginAttempts.delete(identifier);
};

export const register = async (data) => {
  const { email, password, username, firstName, lastName } = data;

  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
      firstName,
      lastName,
    },
  });

  return user;
};

export const login = async (identifier, password) => {
  // ⛔ Check if this identifier is locked due to too many failed attempts
  const lockRemaining = checkLoginAttempts(identifier);
  if (lockRemaining !== null) {
    const error = new Error('Terlalu banyak percobaan login. Tunggu beberapa menit sebelum mencoba lagi.');
    error.statusCode = 429;
    throw error;
  }

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: identifier }, { username: identifier }],
    },
    include: { permissions: true }
  });

  if (!user || !user.password) {
    const error = new Error('Username atau NIK tidak ditemukan');
    error.statusCode = 401;
    throw error;
  }

  if (user.status !== 'ACTIVE') {
    const error = new Error('Akun Karyawan tidak aktif');
    error.statusCode = 401;
    throw error;
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    const remaining = recordFailedAttempt(identifier);
    let msg = 'Password salah';
    if (remaining !== null) {
      msg = `Password salah. Percobaan login tersisa: ${remaining}`;
    }
    const error = new Error(msg);
    error.statusCode = 401;

    // ✅ Log failed attempt
    try {
      await prisma.loginAttempt.create({
        data: {
          identifier,
          userId: user.id,
          success: false,
          reason: 'failed_login',
        }
      });
    } catch (logError) {};

    throw error;
  }

  // ✅ Success – clear attempts map
  resetLoginAttempts(identifier);

  // ✅ Log successful login attempt
  try {
    await prisma.loginAttempt.create({
      data: {
        identifier,
        userId: user.id,
        success: true,
        reason: 'successful_login',
      }
    });
  } catch (logError) {
    console.error('Failed to log successful login:', logError);
  }

  return user;
};

export const googleLogin = async (idToken) => {
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const { sub: googleId, email, given_name, family_name, picture } = payload;

  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    const error = new Error('Akun Google ini belum terdaftar. Silakan hubungi Administrator.');
    error.statusCode = 401;
    throw error;
  } else if (!user.googleId) {
    // Link Google account if not linked
    user = await prisma.user.update({
      where: { id: user.id },
      data: { googleId, picture, isEmailVerified: true },
    });
  }

  return user;
};

export const getUserCompanies = async (userId) => {
  return await prisma.userCompany.findMany({
    where: { userId },
    include: {
      company: true,
    },
  });
};

export const createSession = async (user, companyCode = null) => {
  let companyId = null;

  if (companyCode) {
    const company = await prisma.company.findUnique({
      where: { code: companyCode },
    });
    
    if (!company) throw new Error('Company not found');

    const Access = await prisma.userCompany.findUnique({
      where: {
        userId_companyId: {
          userId: user.id,
          companyId: company.id,
        },
      },
    });

    if (!Access) throw new Error('Access denied to this company');
    companyId = company.id;
    
    // Check if this is a supplier access
    if (Access.supplierId) {
      // Logic to handle supplier specific session if needed
      // Currently just passing companyId, but you might want to pass supplierId to generateTokens
      return { ...generateTokens(user, companyId, Access.supplierId), user }; 
    }
  }

  // Generate tokens
  const tokens = generateTokens(user, companyId);
  
  // Save refresh token to DB (basic implementation)
  await prisma.refreshToken.create({
    data: {
      token: tokens.refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    },
  });

  // Update lastLoginAt and fetch fresh user data with permissions to return
  const userData = await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
      include: { permissions: true }
  });

  return { ...tokens, user: userData };
};

export const refreshAccessToken = async (refreshToken) => {
  // 1. Verify Refresh Token in DB
  const storedToken = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
    include: { user: true }
  });

  if (!storedToken || storedToken.revoked || new Date() > storedToken.expiresAt) {
    throw new Error('Invalid or expired refresh token');
  }

  // 2. Generate New Tokens
  // Note: We might want to persist companyId if refreshToken was tied to one, 
  // currently we are just regenerating for user. Ideally UserCompany context should be in RefreshToken too.
  // For now, let's regenerate basic access.
  const user = storedToken.user;
  const newTokens = generateTokens(user, null); // Provide companyId if saved in DB

  // 3. Rotate Refresh Token (Delete old, create new)
  // Or just update the old one. Let's Rotate.
  await prisma.refreshToken.delete({ where: { id: storedToken.id } });
  
  await prisma.refreshToken.create({
    data: {
      token: newTokens.refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
    },
  });

  return newTokens;
};

export const revokeRefreshToken = async (token) => {
    await prisma.refreshToken.update({
        where: { token },
        data: { revoked: true }
    }).catch(() => {
        // Token might already be deleted or invalid, ignore error on logout
    });
};

export const changePassword = async (userId, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: userId },
    data: {
      password: hashedPassword,
      mustChangePassword: false
    }
  });
};

export const changePasswordWithOld = async (userId, oldPassword, newPassword) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('User not found');

  const isValid = await bcrypt.compare(oldPassword, user.password);
  if (!isValid) {
    const error = new Error('Password lama tidak sesuai');
    error.statusCode = 401;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: userId },
    data: {
      password: hashedPassword,
      mustChangePassword: false
    }
  });
};
