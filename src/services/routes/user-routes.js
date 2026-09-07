import express from 'express';
import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  changePassword
} from '../controller/user-controller.js';
import validate from '../../middlewares/validate.js';
import validateQuery from '../../middlewares/validate.js';
import {
  createUserSchema,
  updateUserSchema,
  getUserQuerySchema,
  updatePasswordSchema
} from '../schema/user-schema.js';
import authenticateToken from '../../middlewares/auth.js';
import authorizeRole from '../../middlewares/auth-role.js';

const router = express.Router();

router.post('/user', authenticateToken, authorizeRole('admin'), validate(createUserSchema), createUser);
router.get('/user', authenticateToken, authorizeRole('admin'), validateQuery(getUserQuerySchema), getUsers);
router.get('/user/:id', authenticateToken, authorizeRole('admin'), getUserById);
router.put('/user/:id', authenticateToken, authorizeRole('admin'), validate(updateUserSchema), updateUser);
router.delete('/user/:id', authenticateToken, authorizeRole('admin'), deleteUser);
router.put('/user/:id/password', authenticateToken, authorizeRole('admin'), validate(updatePasswordSchema), changePassword);

export default router;