import express from 'express';
import { 
    createSuggestion,
    getSuggestions,
    getSuggestionById,
    updateSuggestion,
    deleteSuggestion,
    getSuggestionAnalytics
} from '../controllers/suggestionController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.use(verifyToken); // Require authentication for all suggestion routes

// Analytics
router.get('/analytics', getSuggestionAnalytics);

// List and Create
router.route('/')
    .get(getSuggestions)
    .post(
        upload.fields([{ name: 'fotoKondisi', maxCount: 3 }]), 
        createSuggestion
    );

// Read, Update, Delete
router.route('/:id')
    .get(getSuggestionById)
    .put(
        upload.fields([
            { name: 'fotoKondisi', maxCount: 3 },
            { name: 'fotoEvaluasi', maxCount: 3 }
        ]), 
        updateSuggestion
    )
    .delete(deleteSuggestion); // optionally authorize('ADMIN')

export default router;
