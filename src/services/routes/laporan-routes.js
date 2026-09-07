import express from 'express';
import {
  getLaporan,
  getDetailLaporan,
  exportLaporan,
} from '../controller/laporan-controller.js';

import validate from '../../middlewares/validate.js';
import {
  laporanSchema,
  detailSchema,
} from '../schema/laporan-schema.js';
import authenticateToken from '../../middlewares/auth.js';
import authorizeRole from '../../middlewares/auth-role.js';

const router = express.Router();

router.get('/laporan', authenticateToken, authorizeRole('admin'), validate(laporanSchema), getLaporan);
router.get('/laporan/detail', authenticateToken, authorizeRole('admin'), validate(detailSchema), getDetailLaporan);
router.get('/laporan/export', authenticateToken, authorizeRole('admin'), validate(laporanSchema), exportLaporan);

export default router;