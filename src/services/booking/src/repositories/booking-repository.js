import Booking from '../models/booking-model.js';

export default class BookingRepository {
  static async storePendingBooking(
    userId,
    flightId,
    numberOfPassengers,
    totalPrice,
    payStackRef
  ) {
    try {
      const pendingBooking = await Booking.create({
        userId,
        flightId,
        numberOfPassengers,
        totalPrice,
        payStackRef,
      });
      return pendingBooking;
    } catch (error) {
      throw error;
    }
  }

  static async confirmBooking(bookingId) {
    try {
      const booking = await Booking.findOne({ where: { id: bookingId } });
      booking.paymentStatus = 'paid';
      await booking.save();
      return booking;
    } catch (error) {
      throw error;
    }
  }

  static async findBookingByPaystackRefAndUpdateBookingStatus(payStackRef) {
    try {
      const booking = await Booking.findOne({
        where: { payStackRef: payStackRef },
      });

      if (!booking) {
        console.error('No booking found for payStackRef:', payStackRef);
        return null;
      }

      booking.paymentStatus = 'paid';
      await booking.save();

      return booking;
    } catch (error) {
      throw error;
    }
  }
}
