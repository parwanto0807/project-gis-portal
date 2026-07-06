import express from 'express';
import { getAllEmployees } from '../controllers/employeeController.js';
import { verifyApiKeyOrToken, roleMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Apply verifyApiKeyOrToken to all employee routes
router.use(verifyApiKeyOrToken);

// GET /api/v1/employees - Get all employees (Protected: HR, ADMIN)
router.get('/', roleMiddleware(['HR', 'ADMIN']), getAllEmployees);

export default router;
