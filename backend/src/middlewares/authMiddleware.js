import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

export const verifyToken = (req, res, next) => {
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

// Allows access if a valid API Key is provided OR a valid JWT token
export const verifyApiKeyOrToken = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const validApiKey = process.env.API_KEY;

  if (apiKey && validApiKey && apiKey === validApiKey) {
    // Mock user for roleMiddleware to pass
    req.user = { role: 'ADMIN', source: 'api_key' };
    return next();
  }

  // Fallback to JWT token verification
  return verifyToken(req, res, next);
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
