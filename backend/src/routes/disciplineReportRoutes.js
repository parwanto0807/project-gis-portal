import express from 'express';
import multer from 'multer';
import path from 'path';
import { createReport, getReports, getHrmEmployees, resolveReport, getEmployeesMaster } from '../controllers/disciplineReportController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Format file tidak didukung. Hanya file gambar yang diizinkan.'));
    }
  }
});

// Routes
router.use(verifyToken);

router.get('/employees', getHrmEmployees);
router.get('/employees/master', getEmployeesMaster);
router.post('/', upload.single('photo'), createReport);
router.get('/', getReports);
router.patch('/:id/resolve', upload.single('resolutionPhoto'), resolveReport);

export default router;
