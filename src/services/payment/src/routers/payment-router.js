import { Router } from 'express';
import PaymentController from '../controllers/payment-controller.js';

const router = Router();

router.get('/paystack-callback', PaymentController.paystackCallBack);

export default router;
