import { Router } from 'express';
import AirportController from '../controllers/airport-controller.js';

const router = Router();

router.get('/', AirportController.getAllAirports);
router.post('/', AirportController.addAirport);
router.get('/:country', AirportController.getAirportsByCountry);

export default router;
