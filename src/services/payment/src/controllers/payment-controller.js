import PaymentConfirmationHandler from '../utils/payment-confirmation-handler.js';
import paymentRepository from '../repositories/payment-repository.js';

export default class PaymentController {
  static async paystackCallBack(req, res) {
    try {
      const { reference } = req.query;

      const transactionData =
        await PaymentConfirmationHandler.verifyTransaction(reference);

      if (transactionData.status === 'success') {

        const response =
          await PaymentConfirmationHandler.confirmPaymentWithQueue(reference);


        if (!response.error) {
          await paymentRepository.addPaymentRecord(
            response.userId,
            response.bookingId,
            response.totalPrice
          );

          return res.redirect('https://flssuccess.vzy.io/');
        } else {
          console.error('Listener reported an error:', response.error);
          return res.redirect('https://fls118.vzy.io/');
        }
      } else {
        console.log(
          'Transaction verification failed. Redirecting to failure page.'
        );
        return res.redirect('https://flightreservation.vzy.io/');
      }
    } catch (error) {
      console.error('Error processing callback:', error);
      return res.status(500).send('Internal Server Error');
    }
  }
}
