import Joi from 'joi';

export default class BookingValidation {
  static initiateBookingSchema = Joi.object({
    userId: Joi.number().required().messages({
      'number.base': 'UserId must be a number!',
      'number.empty': 'userId cannot be empty!',
      'any.required': 'userId is required!',
    }),
    flightId: Joi.number().required().messages({
      'number.base': 'flightId must be a number!',
      'number.empty': 'flightId cannot be empty!',
      'any.required': 'flightId is required!',
    }),
    numberOfPassengers: Joi.number().required().messages({
      'number.base': 'numberOfPassengers must be a number!',
      'number.empty': 'numberOfPassengers cannot be empty!',
      'any.required': 'numberOfPassengers is required!',
    }),
    totalPrice: Joi.number().required().messages({
      'number.base': 'totalPrice must be a number!',
      'number.empty': 'totalPrice cannot be empty!',
      'any.required': 'totalPrice is required!',
    }),
  });

  static findPaymentByPayStackRef = Joi.object({
    payStackRef: Joi.number().required().messages({
        'number.base': 'payStackRef must be a number!',
        'number.empty': 'payStackRef cannot be empty!',
        'any.required': 'payStackRef is required!',
      }),
  });

  static confirmBooking = Joi.object({
    bookingId: Joi.number().required().messages({
        'number.base': 'bookingId must be a number!',
        'number.empty': 'bookingId cannot be empty!',
        'any.required': 'bookingId is required!',
      }),
  })
}
