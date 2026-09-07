import express from 'express';
import {
  register,
  login,
  refreshAccessToken,
  logout,
  getProfile
} from '../controller/auth-controller.js';
import validate from '../../middlewares/validate.js';
import {
  registerPayloadSchema,
  loginPayloadSchema,
  refreshTokenSchema,
  logoutSchema,
} from '../schema/auth-schema.js';
import authenticateToken from '../../middlewares/auth.js';

const router = express.Router();

router.post('/auth/register', validate(registerPayloadSchema), register);
router.post('/auth/login', validate(loginPayloadSchema), login);
router.put('/auth/refresh', validate(refreshTokenSchema), refreshAccessToken);
router.delete('/auth/logout', authenticateToken, validate(logoutSchema), logout);
router.get('/auth/profile', authenticateToken, getProfile);


export default router;