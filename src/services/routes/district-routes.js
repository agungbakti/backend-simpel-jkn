import express from 'express';
import {
  createDistrictHospital,
  getDistrictHospitals,
  getDistrictHospitalById,
  updateDistrictHospital,
  deleteDistrictHospital
} from '../controller/district-controller.js';
import validate from '../../middlewares/validate.js';
import {
  createDistrictSchema,
  updateDistrictSchema
} from '../schema/district-schema.js';
import authenticateToken from '../../middlewares/auth.js';
import authorizeRole from '../../middlewares/auth-role.js';

const router = express.Router();

router.post('/district', authenticateToken, authorizeRole('admin'), validate(createDistrictSchema), createDistrictHospital);
router.get('/district', getDistrictHospitals);
router.get('/district/:id', getDistrictHospitalById);
router.put('/district/:id', authenticateToken, authorizeRole('admin'), validate(updateDistrictSchema), updateDistrictHospital);
router.delete('/district/:id', authenticateToken, authorizeRole('admin'), deleteDistrictHospital);

export default router;