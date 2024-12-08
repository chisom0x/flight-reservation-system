import Flight from '../models/flight_model.js';
import { Op } from 'sequelize';


export default class FlightRepository {
  static async addFlight(
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
  ) {
    try {
      const newFlight = await Flight.create({
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
      });
  
      return newFlight;
    } catch (error) {
      throw error; 
    }
  }

  static async getAvailableFlights(
    departureAirportId,
    arrivalAirportId,
    departureDate,
    passengers
  ) {
    try {
      const flights = await Flight.findAll({
        where: {
          departureAirportId,
          arrivalAirportId,
          departureDate,
          seatsAvailable: {
            [Op.gte]: passengers,
          },
        },
        order: [['departureTime', 'ASC']],
      });

      return flights;
    } catch (error) {
      throw error;
    }
  }

  static async getFlightById(flightId) {
    try {
      const flight = await Flight.findByPk(flightId);
      return flight;
    } catch (error) {
      throw error;
    }
  }

  static async updateFlightStatus(flightId, status) {
    try {
      const flight = await Flight.findByPk(flightId);

      if (!flight) {
        throw new Error(`Flight with ID ${flightId} not found.`);
      }

      flight.status = status;
      await flight.save();

      return flight;
    } catch (error) {
      throw error;
    }
  }

  static async editFlightDetails(flightId, updatedDetails) {
    try {
      const flight = await Flight.findByPk(flightId);

      if (!flight) {
        throw new Error(`Flight with ID ${flightId} not found.`);
      }

      Object.keys(updatedDetails).forEach((key) => {
        if (flight[key] !== undefined) {
          flight[key] = updatedDetails[key];
        }
      });

      await flight.save();

      return flight;
    } catch (error) {
      throw error;
    }
  }

  static async deleteFlight(flightId) {
    try {
      const flight = await Flight.findByPk(flightId);

      if (!flight) {
        throw new Error(`Flight with ID ${flightId} not found.`);
      }

      await flight.destroy();

      return null;
    } catch (error) {
      throw new Error(`Failed to delete flight: ${error.message}`);
    }
  }

  
}
