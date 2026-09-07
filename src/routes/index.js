import { Router } from 'express';
import user from '../services/routes/user-routes.js';
import dashboard from '../services/routes/dashboard-routes.js';
import laporan from '../services/routes/laporan-routes.js';
import auth from '../services/routes/auth-routes.js';
import location from '../services/routes/location-routes.js';
import hospital from '../services/routes/hospital-routes.js';
import need from '../services/routes/need-routes.js';
import information from '../services/routes/information-routes.js';
import data from '../services/routes/data-routes.js';
import district from '../services/routes/district-routes.js';

const router = Router();

router.use('/', user);
router.use('/', dashboard);
router.use('/', laporan);
router.use('/', auth);
router.use('/', location);
router.use('/', hospital);
router.use('/', need);
router.use('/', information);
router.use('/', data);
router.use('/', district);

export default router;