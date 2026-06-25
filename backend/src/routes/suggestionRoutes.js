import express from 'express';
import { 
    createSuggestion,
    getSuggestions,
    getSuggestionById,
    updateSuggestion,
    deleteSuggestion
} from '../controllers/suggestionController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(verifyToken); // Require authentication for all suggestion routes

// List and Create
router.route('/')
    .get(getSuggestions)
    .post(createSuggestion);

// Read, Update, Delete
router.route('/:id')
    .get(getSuggestionById)
    .put(updateSuggestion)
    .delete(deleteSuggestion); // optionally authorize('ADMIN')

export default router;
