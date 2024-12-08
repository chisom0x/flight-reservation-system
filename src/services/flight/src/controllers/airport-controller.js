import AirportRepository from '../repositories/airport-repository.js';
import AppError from '../../../../shared/error-handling/app-error.js';
import { successResponse } from '../../../../shared/error-handling/response.js';
import AirportValidation from '../validations/airport-validations.js';

export default class AirportController {
  static async addAirport(req, res, next) {
    try {
      const { error } = AirportValidation.addAirport(req.body);
      if (error) {
        return next(new AppError(error.details.map((err) => err.message).join(', '), 400));
      }

      const { airportName, iataCode, country, countryCode, city, cityCode } = req.body;
      await AirportRepository.createAirport(
        airportName,
        iataCode,
        country,
        countryCode,
        city,
        cityCode
      );

      return successResponse(res, null);
    } catch (error) {
      return next(error);
    }
  }

  static async getAirportsByCountry(req, res, next) {
    try {
      const { error } = AirportValidation.getAirportsByCountry(req.query);
      if (error) {
        return next(new AppError(error.details.map((err) => err.message).join(', '), 400));
      }

      const { country } = req.query;
      const airports = await AirportRepository.findAirportByCountry(country);
      return successResponse(res, airports);
    } catch (error) {
      return next(error);
    }
  }

  static async getAllAirports(req, res, next) {
    try {
      const airports = await AirportRepository.findAllAirports();
      return successResponse(res, airports);
    } catch (error) {
      return next(error);
    }
  }
}
