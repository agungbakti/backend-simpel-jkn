import express from 'express';
import {
  createHospital,
  getHospitals,
  getHospitalById,
  updateHospital,
  deleteHospital
} from '../controller/hospital-controller.js';
import validate from '../../middlewares/validate.js';
import {
  createHospitalSchema,
  updateHospitalSchema
} from '../schema/hospital-schema.js';
import authenticateToken from '../../middlewares/auth.js';
import authorizeRole from '../../middlewares/auth-role.js';

const router = express.Router();

router.post('/hospital', authenticateToken, authorizeRole('admin'), validate(createHospitalSchema), createHospital);
router.get('/hospital', getHospitals);
router.get('/hospital/:id', getHospitalById);
router.put('/hospital/:id', authenticateToken, authorizeRole('admin'), validate(updateHospitalSchema), updateHospital);
router.delete('/hospital/:id', authenticateToken, authorizeRole('admin'), deleteHospital);

export default router;