import express from 'express';
import {
  createData,
  getDatas,
  updateStatus,
  updateInformation,
  updateOfficerName,
  updateData,
  getDataById,
  deleteData,
} from '../controller/data-controller.js';
import validate from '../../middlewares/validate.js';
import validateQuery from '../../middlewares/validate.js';
import {
  createDataSchema,
  updateDataSchema,
  getDataQuerySchema,
  updateStatusSchema,
  updateInformationSchema,
  updateOfficerNameSchema
} from '../schema/data-schema.js';
import authenticateToken from '../../middlewares/auth.js';
import authorizeRole from '../../middlewares/auth-role.js';

const router = express.Router();

router.post('/data', authenticateToken, validate(createDataSchema), createData);
router.get('/data', authenticateToken, validateQuery(getDataQuerySchema), getDatas);
router.get('/data/:id', authenticateToken, getDataById);
router.delete('/data/:id', authenticateToken, deleteData);
router.put('/data/:id', authenticateToken, validate(updateDataSchema), updateData);
router.put('/data/:id/status', authenticateToken, authorizeRole('admin'), validate(updateStatusSchema), updateStatus);
router.put('/data/:id/information', authenticateToken, authorizeRole('admin'), validate(updateInformationSchema), updateInformation);
router.put('/data/:id/officer', authenticateToken, authorizeRole('admin'), validate(updateOfficerNameSchema), updateOfficerName);

export default router;
