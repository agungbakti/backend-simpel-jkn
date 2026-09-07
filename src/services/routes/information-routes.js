import express from 'express';
import {
  createInformation,
  getInformations,
  getInformationById,
  updateInformation,
  deleteInformation
} from '../controller/information-controller.js';
import validate from '../../middlewares/validate.js';
import {
  createInformationSchema,
  updateInformationSchema
} from '../schema/information-schema.js';
import authenticateToken from '../../middlewares/auth.js';
import authorizeRole from '../../middlewares/auth-role.js';

const router = express.Router();

router.post('/information', authenticateToken, authorizeRole('admin'), validate(createInformationSchema), createInformation);
router.get('/information', getInformations);
router.get('/information/:id', getInformationById);
router.put('/information/:id', authenticateToken, authorizeRole('admin'), validate(updateInformationSchema), updateInformation);
router.delete('/information/:id', authenticateToken, authorizeRole('admin'), deleteInformation);

export default router;