import Airport from '../models/airport-model.js';

export default class AirportRepository {
  static async findAirportByCountry(country) {
    try {
      const airport = await Airport.findOne({
        where: { country: country },
      });
      return airport;
    } catch (error) {
      throw error;
    }
  }

  static async findAllAirports() {
    try {
      const airports = await Airport.findAll();
      return airports;
    } catch (error) {
      throw error;
    }
  }
  static async createAirport(
    airportName,
    iataCode,
    country,
    countryCode,
    city,
    cityCode
  ) {
    try {
      const newAirPort = await Airport.create({
        airportName: airportName,
        iataCode: iataCode,
        country: country,
        countryCode: countryCode,
        city: city,
        cityCode: cityCode,
      });
      return newAirPort;
    } catch (error) {
      throw error;
    }
  }
}
