import express from 'express';
import * as userController from '../controllers/userController.js';
// import { authMiddleware, roleMiddleware } from '../middlewares/authMiddleware.js'; // Assuming you have these

const router = express.Router();

// TODO: Restore middleware once AuthMiddleware is ready
// router.use(authMiddleware); 
// router.use(roleMiddleware(['SUPER_ADMIN', 'ADMIN']));

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUserDetails);
router.put('/:id/permissions', userController.updateUserPermissions);
router.delete('/:id', userController.deleteUser);

export default router;
