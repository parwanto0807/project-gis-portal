import express from 'express';
import {
    createSuggestion,
    getSuggestions,
    getSuggestionById,
    updateSuggestion,
    deleteSuggestion,
    getSuggestionAnalytics,
    exportSuggestionsExcel
} from '../controllers/suggestionController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';
import prisma from '../config/prisma.js';

const router = express.Router();

router.use(verifyToken); // Require authentication for all suggestion routes

// Analytics
router.get('/analytics', getSuggestionAnalytics);

// Export Excel
router.get('/export/excel', exportSuggestionsExcel);

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

// Bulk update endpoint
router.post('/bulk-update', async (req, res, next) => {
    const { ids, status } = req.body;

    try {
        const updatePromises = ids.map(id => {
            return prisma.improvementSuggestion.update({
                where: { id: parseInt(id) },
                data: { statusApproval: status }
            });
        });

        const updatedSuggestions = await Promise.all(updatePromises);
        res.json({
            success: true,
            data: updatedSuggestions,
            message: `${ids.length} suggestion(s) updated successfully to ${status}`
        });
    } catch (error) {
        next(error);
    }
});

export default router;
