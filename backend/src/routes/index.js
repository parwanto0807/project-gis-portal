import express from 'express';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(StatusCodes.OK).json({ status: 'ok' });
});

// Mount other routes here
import userRoutes from './userRoutes.js';
import authRoutes from './authRoutes.js';
import disciplineReportRoutes from './disciplineReportRoutes.js';
import companyRoutes from './companyRoutes.js';
import dbConnectionRoutes from './dbConnectionRoutes.js';
import productRoutes from './productRoutes.js';
import temuanPeduliRoutes from './temuanPeduliRoutes.js';
import backupRoutes from './backupRoutes.js';
import userLogRoutes from './userLogRoutes.js';
import suggestionRoutes from './suggestionRoutes.js';

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/discipline-reports', disciplineReportRoutes);
router.use('/companies', companyRoutes);
router.use('/database', dbConnectionRoutes);
router.use('/products', productRoutes);
router.use('/temuan-peduli', temuanPeduliRoutes);
router.use('/backups', backupRoutes);
router.use('/user-logs', userLogRoutes);
router.use('/suggestions', suggestionRoutes);

export default router;
