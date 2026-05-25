import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

export const verifyToken = (req, res, next) => {
  // Dev-only bypass: skip auth entirely when not in production
  if (process.env.NODE_ENV !== 'production') {
    req.user = { id: 'dev', role: 'admin' };
    return next();
  }

  let token = req.cookies.accessToken;
  
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ 
      success: false, 
      message: 'Unauthorized: No token provided' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded; // Contains userId, email, role, companyId
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ 
      success: false, 
      message: 'Unauthorized: Invalid or expired token' 
    });
  }
};

export const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(StatusCodes.FORBIDDEN).json({ 
        success: false, 
        message: 'Forbidden: You do not have permission' 
      });
    }
    next();
  };
};
