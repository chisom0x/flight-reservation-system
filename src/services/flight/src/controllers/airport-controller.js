import airportRepository from '../repositories/airport-repository.js';
import AppError from '../../../../shared/error-handling/app-error.js';
import createSendToken from '../../../user/src/utils/jwt-handler.js';
import { successResponse } from '../../../../shared/error-handling/response.js';

export default class Airport {
  static async addAirport(req, res, next) {
    try {
      const { airportName, iataCode, country, countryCode, city, cityCode } =
        req.body;

      if (!airportName)
        return next(new AppError('Please enter your airportName!', 400));
      if (!iataCode)
        return next(new AppError('Please enter your iataCode!', 400));
      if (!country)
        return next(new AppError('Please enter your country!', 400));
      if (!countryCode)
        return next(new AppError('Please enter your countryCode!', 400));
      if (!city) return next(new AppError('Please enter your city!', 400));
      if (!cityCode)
        return next(new AppError('Please enter your cityCode!', 400));

      await airportRepository.createAirport(
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

  static async getAllAirports(req, res, next) {
    try {
      const airports = await airportRepository.findAllAirports();
      return successResponse(res, airports);
    } catch (error) {
      return next(error);
    }
  }

  static async getAirportsByCountry(req, res, next) {
    try {
      const country = req.query;
      if (!country) return next(new AppError('Please Enter a country!', 400));
      const airports = await airportRepository.findAirportByCountry(country);
      return successResponse(res, airports);
    } catch (error) {
      return next(error);
    }
  }
}
