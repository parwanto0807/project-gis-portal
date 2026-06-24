import express from 'express';
import { getAllLogs } from '../controllers/userLogController.js';
import { verifyToken, roleMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Assuming only SUPER_ADMIN or ADMIN can view all logs. You can adjust the permission.
router.get('/', verifyToken, getAllLogs);

export default router;
