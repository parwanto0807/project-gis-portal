import express from 'express';
import * as authController from '../controllers/authController.js';
import prisma from '../config/prisma.js';
import * as authService from '../services/authService.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/google', authController.googleLogin);
router.post('/force-change-password', verifyToken, authController.forceChangePassword);
router.post('/change-password', verifyToken, authController.changePassword);

router.get('/me', verifyToken, (req, res) => {
  res.json({ success: true, user: req.user });
});

router.get('/test-me', async (req, res) => {
  try {
    const email = 'parwanto0807@gmail.com';
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.json({ error: 'not found' });
    const session = await authService.createSession(user);
    res.json(session);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// Add auth middleware for this
// router.get('/companies', authMiddleware, authController.getMyCompanies);

router.post('/refresh', authController.refreshToken);
router.post('/logout', authController.logout);

export default router;
