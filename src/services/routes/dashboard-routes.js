import express from 'express';
import { getDashboard } from '../controller/dashboard-controller.js';
import authenticateToken from '../../middlewares/auth.js';

const router = express.Router();

router.get('/dashboard', authenticateToken, getDashboard);

export default router;