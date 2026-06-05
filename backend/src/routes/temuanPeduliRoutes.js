import express from 'express';
import { verifyToken, roleMiddleware } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';
import * as temuanPeduliController from '../controllers/temuanPeduliController.js';

const router = express.Router();

// Require login for all routes
router.use(verifyToken);

router.get('/', temuanPeduliController.getAllTemuan);
router.post('/', upload.array('fotos', 5), temuanPeduliController.createTemuan);
router.put('/:id', upload.array('fotos', 5), temuanPeduliController.updateTemuan);
router.delete('/:id', temuanPeduliController.deleteTemuan);

export default router;
