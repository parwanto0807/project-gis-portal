import prisma from '../config/prisma.js';
import bcrypt from 'bcryptjs';
import { generateTokens } from '../utils/jwt.js';
import { OAuth2Client } from 'google-auth-library';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: identifier }, { username: identifier }],
    },
    include: { permissions: true } 
  });

  if (!user || !user.password) {
    throw new Error('Invalid credentials');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid credentials');
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
    // Create new user from Google
    user = await prisma.user.create({
      data: {
        email,
        googleId,
        firstName: given_name,
        lastName: family_name,
        picture,
        isEmailVerified: true,
      },
    });
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

  // Fetch fresh user data with permissions to return
  const userData = await prisma.user.findUnique({
      where: { id: user.id },
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
