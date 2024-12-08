import PaymentHandler from '../utils/payment-handler.js';
import BookingValidation from '../validations/booking-validation.js';
import BookingRepository from '../repositories/booking-repository.js';
import AppError from '../../../../shared/error-handling/app-error.js';
import {
  errorResponse,
  successResponse,
} from '../../../../shared/error-handling/response.js';
import UserHandler from '../utils/user-handler.js';

export default class BookingController {
  static async initiateBooking(req, res, next) {
    try {
      const { error, value } = BookingValidation.initiateBookingSchema.validate(
        req.body,
        { abortEarly: false }
      );

      if (error) {
        const validationErrors = error.details.map((err) => err.message);
        return next(new AppError(validationErrors.join(', '), 400));
      }

      const { userId, flightId, numberOfPassengers, totalPrice } = value;

      const userResponse = await UserHandler.getUser(userId);

      if (userResponse) {
        const response = await PaymentHandler.initiatePayment(
          userId,
          userResponse.email,
          totalPrice
        );
        const payStackRef = response.reference;

        await BookingRepository.storePendingBooking(
          userId,
          flightId,
          numberOfPassengers,
          totalPrice,
          payStackRef
        );

        return successResponse(res, {
          authorizationUrl: response.authorizationUrl,
          reference: payStackRef,
        });
      }

      return errorResponse(res, 500, 'Error getting user email');
    } catch (error) {
      return next(error);
    }
  }
}
