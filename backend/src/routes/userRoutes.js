import express from 'express';
import * as userController from '../controllers/userController.js';
import { verifyToken, roleMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(verifyToken);
router.use(roleMiddleware(['SUPER_ADMIN', 'ADMIN']));

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUserDetails);
router.put('/:id/permissions', userController.updateUserPermissions);
router.delete('/:id', userController.deleteUser);

export default router;
