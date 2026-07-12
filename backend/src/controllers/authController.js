import { StatusCodes } from 'http-status-codes';
import * as authService from '../services/authService.js';
import prisma from '../config/prisma.js';

export const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    res.status(StatusCodes.CREATED).json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        username: user.username
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { identifier, password, companyCode } = req.body;
    
    // 1. Validate credentials first
    const user = await authService.login(identifier, password);
    
    // 2. Create Session
    let result;
    if (companyCode) {
      result = await authService.createSession(user, companyCode);
    } else {
      const companies = await authService.getUserCompanies(user.id);
      if (companies.length === 0) {
        result = await authService.createSession(user);
      } else {
        // Multi-company selection needed
        return res.json({ 
           success: true, 
           requireCompanySelection: true,
           availableCompanies: companies.map(uc => uc.company)
        });
      }
    }

    // Set HttpOnly Cookies
    setTokensCookies(res, result.accessToken, result.refreshToken);

    // Remove tokens from body response
    const { accessToken, refreshToken, ...responsePayload } = result;
    res.json({ success: true, data: responsePayload });

  } catch (error) {
    next(error);
  }
};

export const googleLogin = async (req, res, next) => {
  try {
    const { idToken, companyCode } = req.body;
    const user = await authService.googleLogin(idToken);
    
    const result = await authService.createSession(user, companyCode);
    
    // Set HttpOnly Cookies
    setTokensCookies(res, result.accessToken, result.refreshToken);

    // Remove tokens from body response
    const { accessToken, refreshToken, ...responsePayload } = result;
    
    const companies = await authService.getUserCompanies(user.id);
    
    res.json({ 
      success: true, 
      data: responsePayload,
      availableCompanies: companies.map(uc => uc.company) 
    });
  } catch (error) {
    next(error);
  }
};

export const getLoginAttempts = async (req, res, next) => {
  try {
    // Only admins or specific roles can access this endpoint
    const userRole = req.user?.role;
    if (!['ADMIN', 'SUPER_ADMIN'].includes(userRole || '')) {
      return res.status(StatusCodes.FORBIDDEN).json({ success: false, message: 'Access denied: insufficient permissions' });
    }

    const limit = parseInt(req.query.limit) || 50;
    const skip = parseInt(req.query.skip) || 0;
    const successOnly = req.query.success === 'true';
    const identifier = req.query.identifier;

    const where = {};
    if (successOnly) {
      where.success = true;
    }
    if (identifier) {
      where.identifier = identifier;
    }

    const attempts = await prisma.loginAttempt.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            firstName: true,
            lastName: true,
            role: true
          }
        }
      }
    });

    const total = await prisma.loginAttempt.count({ where });

    res.json({
      success: true,
      data: attempts,
      meta: {
        total,
        limit,
        skip,
      }
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'No refresh token provided' });
    }

    const result = await authService.refreshAccessToken(refreshToken);

    // Rotate Refresh Token and Access Token
    setTokensCookies(res, result.accessToken, result.refreshToken);

    res.json({
      success: true
      // accessToken is now in cookie, not in body
    });

  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      await authService.revokeRefreshToken(refreshToken);
    }
    
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
    
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
    
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

export const getMyCompanies = async (req, res, next) => {
  try {
    const companies = await authService.getUserCompanies(req.user.userId);
    res.json({ success: true, data: companies });
  } catch (error) {
    next(error);
  }
};

// Helper
const setTokensCookies = (res, accessToken, refreshToken) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict', // or 'lax' if backend/frontend on different subdomains
  };

  res.cookie('accessToken', accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000 // 15 minutes
  });

  res.cookie('refreshToken', refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

export const forceChangePassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'Password baru minimal 6 karakter' });
    }

    // req.user is set by verifyToken middleware
    await authService.changePassword(req.user.userId, newPassword);

    res.json({ success: true, message: 'Password berhasil diubah' });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Password lama dan password baru wajib diisi' });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'Password baru minimal 6 karakter' });
    }

    await authService.changePasswordWithOld(req.user.userId, oldPassword, newPassword);

    res.json({ success: true, message: 'Password berhasil diubah' });
  } catch (error) {
    next(error);
  }
};
