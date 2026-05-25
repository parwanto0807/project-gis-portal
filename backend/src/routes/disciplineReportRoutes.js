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
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Routes
router.use(verifyToken);

router.get('/employees', getHrmEmployees);
router.get('/employees/master', getEmployeesMaster);
router.post('/', upload.single('photo'), createReport);
router.get('/', getReports);
router.patch('/:id/resolve', upload.single('resolutionPhoto'), resolveReport);

export default router;
