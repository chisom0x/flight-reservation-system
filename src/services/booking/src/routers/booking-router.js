import { Router } from 'express';
import BookingController from '../controllers/booking-controller.js';

const router = Router();

router.post('/initiate-booking', BookingController.initiateBooking);

export default router;
