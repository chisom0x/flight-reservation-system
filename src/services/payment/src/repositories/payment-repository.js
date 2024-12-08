import Payment from '../models/payments-model.js';

export default class PaymentRepository {
  static async addPaymentRecord(userId, bookingId, totalPaid) {
    try {
      const paymentRecord = await Payment.create({
        userId: userId,
        bookingId: bookingId,
        totalPaid: totalPaid,
      });
      return paymentRecord;
    } catch (error) {
      throw error;
    }
  }

  static async findAllPaymentRecords() {
    try {
      const paymentRecords = await Payment.findAll();
      return paymentRecords;
    } catch (error) {
      throw error;
    }
  }
}
