import express from 'express';
import { verifyToken, roleMiddleware } from '../middlewares/authMiddleware.js';
import { backupUpload } from '../middlewares/uploadMiddleware.js';
import * as backupController from '../controllers/backupController.js';

const router = express.Router();

// Require login and super admin / admin for backups
router.use(verifyToken);
router.use(roleMiddleware(['SUPER_ADMIN', 'ADMIN']));

router.get('/', backupController.listBackups);
router.post('/', backupController.createBackup);
router.get('/download/:filename', backupController.downloadBackup);
router.delete('/:filename', backupController.deleteBackup);
router.post('/restore', backupUpload.single('file'), backupController.restoreBackup);

export default router;
