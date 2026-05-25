import express from 'express';
import * as dbConnectionController from '../controllers/dbConnectionController.js';
import { verifyToken, roleMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Only allow SUPER_ADMIN or ADMIN to use database connection tools
router.use(verifyToken, roleMiddleware(['SUPER_ADMIN', 'ADMIN']));

router.post('/connect', dbConnectionController.connect);
router.post('/table', dbConnectionController.getTableDetails);

// Saved Connections
router.get('/saved', dbConnectionController.getSavedConnections);
router.post('/saved', dbConnectionController.saveConnection);
router.delete('/saved/:id', dbConnectionController.deleteSavedConnection);

export default router;
