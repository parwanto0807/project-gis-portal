import express from 'express';
import * as authController from '../controllers/authController.js';
import { verifyToken, roleMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', verifyToken, roleMiddleware(['SUPER_ADMIN', 'ADMIN']), authController.register);
router.post('/login', authController.login);
router.post('/google', authController.googleLogin);
router.post('/force-change-password', verifyToken, authController.forceChangePassword);
router.post('/change-password', verifyToken, authController.changePassword);

router.get('/me', verifyToken, (req, res) => {
  res.json({ success: true, user: req.user });
});

router.get('/login-attempts', verifyToken, authController.getLoginAttempts);

router.post('/refresh', authController.refreshToken);
router.post('/logout', authController.logout);

export default router;
