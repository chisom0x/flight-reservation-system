import { Router } from 'express';
import Airport from '../controllers/airport-controller';

const router = Router();

router.get('/', Airport.getAllAirports);
router.post('/', Airport.addAirport);
router.get('/:country', Airport.getAirportsByCountry);

export default router;
