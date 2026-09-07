import express from 'express';
import {
  createNeed,
  getNeeds,
  getNeedById,
  updateNeed,
  deleteNeed
} from '../controller/need-controller.js';
import validate from '../../middlewares/validate.js';
import {
  createNeedSchema,
  updateNeedSchema
} from '../schema/need-schema.js';
import authenticateToken from '../../middlewares/auth.js';
import authorizeRole from '../../middlewares/auth-role.js';

const router = express.Router();

router.post('/need', authenticateToken, authorizeRole('admin'), validate(createNeedSchema), createNeed);
router.get('/need', getNeeds);
router.get('/need/:id', getNeedById);
router.put('/need/:id', authenticateToken, authorizeRole('admin'), validate(updateNeedSchema), updateNeed);
router.delete('/need/:id', authenticateToken, authorizeRole('admin'), deleteNeed);

export default router;