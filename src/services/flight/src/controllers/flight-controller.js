import flightRepository from '../repositories/flight_repositories.js';
import AppError from '../../../../shared/error-handling/app-error.js';
import { successResponse } from '../../../../shared/error-handling/response.js';
import FlightValidationSchema from '../validations/flight-validations.js';

export default class FlightController {
  static async addFlight(req, res, next) {
    try {
      const { error, value } = FlightValidationSchema.addFlight.validate(
        req.body,
        {
          abortEarly: false,
        }
      );

      if (error) {
        const validationErrors = error.details.map((err) => err.message);
        return next(new AppError(validationErrors.join(', '), 400));
      }

      const {
        flightNumber,
        departureAirportId,
        arrivalAirportId,
        departureDate,
        departureTime,
        arrivalTime,
        duration,
        price,
        airlineName,
        seatsAvailable,
      } = value;

      const newFlight = await flightRepository.addFlight(
        flightNumber,
        departureAirportId,
        arrivalAirportId,
        departureDate,
        departureTime,
        arrivalTime,
        duration,
        price,
        airlineName,
        seatsAvailable
      );

      return successResponse(res, newFlight);
    } catch (error) {
      return next(error);
    }
  }

  static async getFlightById(req, res, next) {
    try {
      const { error, value } = FlightValidationSchema.flightId.validate(
        req.params,
        {
          abortEarly: false,
        }
      );

      if (error) {
        const validationErrors = error.details.map((err) => err.message);
        return next(new AppError(validationErrors.join(', '), 400));
      }

      const { flightId } = value;

      const flight = await flightRepository.getFlightById(flightId);

      if (!flight) {
        return next(new AppError(`Flight with ID ${flightId} not found`, 404));
      }

      return successResponse(res, flight);
    } catch (error) {
      return next(error);
    }
  }

  static async getFlights(req, res, next) {
    try {
      const { error, value } =
        FlightValidationSchema.flightSearch.validate(req.query, {
          abortEarly: false,
        });

      if (error) {
        const validationErrors = error.details.map((err) => err.message);
        return next(new AppError(validationErrors.join(', '), 400));
      }

      const {
        departureAirportId,
        arrivalAirportId,
        departureDate,
        passengers,
      } = req.query;

      const flights = await flightRepository.getAvailableFlights(
        departureAirportId,
        arrivalAirportId,
        departureDate,
        passengers
      );

      return successResponse(res, flights);
    } catch (error) {
      return next(error);
    }
  }

  static async updateFlightStatus(req, res, next) {
    try {
      const { error, value } =
        FlightValidationSchema.updateFlightStatus.validate(
          req.body,
          req.params.flightId,
          {
            abortEarly: false,
          }
        );

      if (error) {
        const validationErrors = error.details.map((err) => err.message);
        return next(new AppError(validationErrors.join(', '), 400));
      }

      const flightId = req.params.flightId;
      const { status } = value;

      const updatedFlight = await flightRepository.updateFlightStatus(
        flightId,
        status
      );

      return successResponse(res, updatedFlight);
    } catch (error) {
      return next(error);
    }
  }

  static async editFlightDetails(req, res, next) {
    try {
      const { error, value } =
        FlightValidationSchema.editFlightDetails.validate(req.body, {
          abortEarly: false,
        });

      if (error) {
        const validationErrors = error.details.map((err) => err.message);
        return next(new AppError(validationErrors.join(', '), 400));
      }

      const { flightId } = req.params;
      const updatedDetails = value.updatedDetails;

      const updatedFlight = await flightRepository.editFlightDetails(
        flightId,
        updatedDetails
      );

      return successResponse(res, updatedFlight);
    } catch (error) {
      return next(error);
    }
  }

  static async deleteFlight(req, res, next) {
    try {
      const { error, value } =
        FlightValidationSchema.deleteFlight.validate(req.params, {
          abortEarly: false,
        });

      if (error) {
        const validationErrors = error.details.map((err) => err.message);
        return next(new AppError(validationErrors.join(', '), 400));
      }

      const { flightId } = value;

      await flightRepository.deleteFlight(flightId);

      return successResponse(res, { message: 'Flight deleted successfully' });
    } catch (error) {
      return next(error);
    }
  }
}
