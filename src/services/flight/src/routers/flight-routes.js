import { Router } from 'express';
import FlightController from '../controllers/flight-controller.js';

const router = Router();

router.post('/', FlightController.addFlight),
  router.get('/:flightId', FlightController.getFlightById);
router.get('/', FlightController.getFlights);
router.patch('/update-status/:flightId', FlightController.updateFlightStatus),
  router.patch(
    '/edit-flight-info/:flightId',
    FlightController.editFlightDetails
  );
router.delete('/:flightId', FlightController.deleteFlight);

export default router;
