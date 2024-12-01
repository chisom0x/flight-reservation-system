import { Router } from 'express';
import airportRouter from './airports-routes.js';

const router = Router();

router.use('/airports', airportRouter);

export default router;
