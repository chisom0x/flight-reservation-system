import { Router } from 'express';
import airportRouter from './airports-routes.js';
import flightRouter from './flight-routes.js'

const router = Router();

router.use('/airports', airportRouter);
router.use('/flight', flightRouter)

export default router;
