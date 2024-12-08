import Joi from 'joi';

export default class AirportValidation {
  static addAirport(data) {
    const schema = Joi.object({
      airportName: Joi.string().min(2).required().messages({
        'string.base': 'Airport name must be a string!',
        'string.empty': 'Airport name cannot be empty!',
        'string.min': 'Airport name must be at least 2 characters long!',
        'any.required': 'Airport name is required!',
      }),
      iataCode: Joi.string().length(3).uppercase().required().messages({
        'string.base': 'IATA code must be a string!',
        'string.empty': 'IATA code cannot be empty!',
        'string.length': 'IATA code must be exactly 3 uppercase letters!',
        'any.required': 'IATA code is required!',
      }),
      country: Joi.string().required().messages({
        'string.base': 'Country must be a string!',
        'string.empty': 'Country cannot be empty!',
        'any.required': 'Country is required!',
      }),
      countryCode: Joi.string().length(2).uppercase().required().messages({
        'string.base': 'Country code must be a string!',
        'string.empty': 'Country code cannot be empty!',
        'string.length': 'Country code must be exactly 2 uppercase letters!',
        'any.required': 'Country code is required!',
      }),
      city: Joi.string().required().messages({
        'string.base': 'City must be a string!',
        'string.empty': 'City cannot be empty!',
        'any.required': 'City is required!',
      }),
      cityCode: Joi.string().length(3).uppercase().required().messages({
        'string.base': 'City code must be a string!',
        'string.empty': 'City code cannot be empty!',
        'string.length': 'City code must be exactly 3 uppercase letters!',
        'any.required': 'City code is required!',
      }),
    });

    return schema.validate(data, { abortEarly: false });
  }

  static getAirportsByCountry(data) {
    const schema = Joi.object({
      country: Joi.string().required().messages({
        'string.base': 'Country must be a string!',
        'string.empty': 'Country cannot be empty!',
        'any.required': 'Country is required!',
      }),
    });

    return schema.validate(data, { abortEarly: false });
  }
}
