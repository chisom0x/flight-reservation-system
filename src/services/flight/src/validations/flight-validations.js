import Joi from 'joi';

export default class FlightValidationSchema {
  static addFlight() {
    return Joi.object({
      flightNumber: Joi.string().min(3).max(10).required().messages({
        'string.base': 'Flight number must be a string!',
        'string.empty': 'Flight number cannot be empty!',
        'string.min': 'Flight number must be at least 3 characters long!',
        'string.max': 'Flight number cannot exceed 10 characters!',
        'any.required': 'Flight number is required!',
      }),
      departureAirportId: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
          'number.base': 'Departure airport ID must be a number!',
          'number.integer': 'Departure airport ID must be an integer!',
          'number.positive': 'Departure airport ID must be a positive number!',
          'any.required': 'Departure airport ID is required!',
        }),
      arrivalAirportId: Joi.number().integer().positive().required().messages({
        'number.base': 'Arrival airport ID must be a number!',
        'number.integer': 'Arrival airport ID must be an integer!',
        'number.positive': 'Arrival airport ID must be a positive number!',
        'any.required': 'Arrival airport ID is required!',
      }),
      departureDate: Joi.date().iso().required().messages({
        'date.base': 'Departure date must be a valid date!',
        'date.isoDate': 'Departure date must be in ISO format!',
        'any.required': 'Departure date is required!',
      }),
      departureTime: Joi.string()
        .regex(/^([0-9]{2}):([0-9]{2})$/)
        .required()
        .messages({
          'string.base': 'Departure time must be a string!',
          'string.empty': 'Departure time cannot be empty!',
          'string.pattern.base': 'Departure time must be in HH:mm format!',
          'any.required': 'Departure time is required!',
        }),
      arrivalTime: Joi.string()
        .regex(/^([0-9]{2}):([0-9]{2})$/)
        .required()
        .messages({
          'string.base': 'Arrival time must be a string!',
          'string.empty': 'Arrival time cannot be empty!',
          'string.pattern.base': 'Arrival time must be in HH:mm format!',
          'any.required': 'Arrival time is required!',
        }),
      duration: Joi.string().min(5).max(10).required().messages({
        'string.base': 'Flight duration must be a string!',
        'string.empty': 'Flight duration cannot be empty!',
        'string.min': 'Flight duration must be at least 5 characters long!',
        'string.max': 'Flight duration cannot exceed 10 characters!',
        'any.required': 'Flight duration is required!',
      }),
      price: Joi.number().min(0).required().messages({
        'number.base': 'Price must be a number!',
        'number.min': 'Price cannot be less than 0!',
        'any.required': 'Price is required!',
      }),
      airlineName: Joi.string().min(2).max(100).required().messages({
        'string.base': 'Airline name must be a string!',
        'string.empty': 'Airline name cannot be empty!',
        'string.min': 'Airline name must be at least 2 characters long!',
        'string.max': 'Airline name cannot exceed 100 characters!',
        'any.required': 'Airline name is required!',
      }),
      seatsAvailable: Joi.number().integer().min(0).required().messages({
        'number.base': 'Seats available must be a number!',
        'number.integer': 'Seats available must be an integer!',
        'number.min': 'Seats available cannot be less than 0!',
        'any.required': 'Seats available is required!',
      }),
    });
  }

  static flightSearch() {
    return Joi.object({
      departureAirportId: Joi.number().integer().required().messages({
        'number.base': 'Departure Airport ID must be a number!',
        'number.integer': 'Departure Airport ID must be an integer!',
        'any.required': 'Departure Airport ID is required!',
      }),
      arrivalAirportId: Joi.number().integer().required().messages({
        'number.base': 'Arrival Airport ID must be a number!',
        'number.integer': 'Arrival Airport ID must be an integer!',
        'any.required': 'Arrival Airport ID is required!',
      }),
      departureDate: Joi.date().iso().required().messages({
        'date.base': 'Departure date must be a valid date!',
        'date.iso': 'Departure date must be in ISO format!',
        'any.required': 'Departure date is required!',
      }),
      passengers: Joi.number().integer().min(1).required().messages({
        'number.base': 'Passengers must be a number!',
        'number.integer': 'Passengers must be an integer!',
        'number.min': 'There must be at least 1 passenger!',
        'any.required': 'Number of passengers is required!',
      }),
    });
  }

  static flightId() {
    return Joi.object({
      flightId: Joi.number().integer().positive().required().messages({
        'number.base': 'Flight ID must be a number!',
        'number.integer': 'Flight ID must be an integer!',
        'number.positive': 'Flight ID must be a positive integer!',
        'any.required': 'Flight ID is required!',
      }),
    });
  }

  static updateFlightStatus() {
    return Joi.object({
      flightId: Joi.number().integer().positive().required().messages({
        'number.base': 'Flight ID must be a number!',
        'number.integer': 'Flight ID must be an integer!',
        'number.positive': 'Flight ID must be a positive integer!',
        'any.required': 'Flight ID is required!',
      }),
      status: Joi.string()
        .valid('scheduled', 'delayed', 'cancelled', 'departed', 'landed')
        .required()
        .messages({
          'string.base': 'Status must be a string!',
          'string.empty': 'Status cannot be empty!',
          'any.required': 'Flight status is required!',
          'any.only':
            'Status must be one of: scheduled, delayed, cancelled, departed, landed.',
        }),
    });
  }

  static editFlightDetails() {
    return Joi.object({
      flightId: Joi.number().integer().positive().required().messages({
        'number.base': 'Flight ID must be a number!',
        'number.integer': 'Flight ID must be an integer!',
        'number.positive': 'Flight ID must be a positive integer!',
        'any.required': 'Flight ID is required!',
      }),
      updatedDetails: Joi.object({
        flightNumber: Joi.string().optional().messages({
          'string.base': 'Flight number must be a string!',
        }),
        departureAirportId: Joi.number()
          .integer()
          .positive()
          .optional()
          .messages({
            'number.base': 'Departure airport ID must be a number!',
          }),
        arrivalAirportId: Joi.number()
          .integer()
          .positive()
          .optional()
          .messages({
            'number.base': 'Arrival airport ID must be a number!',
          }),
        departureDate: Joi.date().iso().optional().messages({
          'date.base': 'Departure date must be a valid date!',
        }),
        duration: Joi.string().optional().messages({
          'string.base': 'Duration must be a string!',
        }),
      }).optional(),
    });
  }

  static deleteFlight() {
    return Joi.object({
      flightId: Joi.number().integer().positive().required().messages({
        'number.base': 'Flight ID must be a number!',
        'number.integer': 'Flight ID must be an integer!',
      }),
    });
  }
}
