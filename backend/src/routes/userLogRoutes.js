import express from 'express';
import { getAllLogs } from '../controllers/userLogController.js';
import { verifyToken, roleMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Restrict user logs viewing to ADMIN and SUPER_ADMIN
router.get('/', verifyToken, roleMiddleware(['SUPER_ADMIN', 'ADMIN']), getAllLogs);

export default router;
