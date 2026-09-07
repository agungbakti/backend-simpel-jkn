import express from 'express';
import {
  createLocation,
  getLocations,
  getLocationById,
  updateLocation,
  deleteLocation
} from '../controller/location-controller.js';
import validate from '../../middlewares/validate.js';
import {
  createLocationSchema,
  updateLocationSchema
} from '../schema/location-schema.js';
import authenticateToken from '../../middlewares/auth.js';
import authorizeRole from '../../middlewares/auth-role.js';

const router = express.Router();

router.post('/location', authenticateToken, authorizeRole('admin'), validate(createLocationSchema), createLocation);
router.get('/location', getLocations);
router.get('/location/:id', getLocationById);
router.put('/location/:id', authenticateToken, authorizeRole('admin'), validate(updateLocationSchema), updateLocation);
router.delete('/location/:id', authenticateToken, authorizeRole('admin'), deleteLocation);

export default router;