import amqp from 'amqplib';
import bookingRepository from '../repositories/booking-repository.js';

export async function confirmBookingListener() {
  try {

    const connection = await amqp.connect('amqp://guest:guest@localhost');

    const channel = await connection.createChannel();

    const exchange = 'confirm-payment-exchange';
    const routingKey = 'payment.confirm';
    const queueName = 'payment-queue';

    await channel.assertExchange(exchange, 'direct', { durable: true });

    await channel.assertQueue(queueName, { durable: true });

    await channel.bindQueue(queueName, exchange, routingKey);

    channel.consume(queueName, async (msg) => {
      if (msg) {
        try {
          const reference = JSON.parse(msg.content.toString());

          const bookingResponse =
            await bookingRepository.findBookingByPaystackRefAndUpdateBookingStatus(
              reference.reference
            );

          const { userId, id, totalPrice } = bookingResponse;

          await channel.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(
              JSON.stringify({
                userId,
                bookingId: id,
                totalPrice,
                error: null,
              })
            ),
            { correlationId: msg.properties.correlationId }
          );

          channel.ack(msg);
        } catch (error) {
          console.error('Error updating booking status:', error);

          await channel.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(
              JSON.stringify({
                error: 'Failed to update booking status',
              })
            ),
            { correlationId: msg.properties.correlationId }
          );
          console.log('Error response sent to publisher.');

          channel.ack(msg);
          console.log('Message acknowledged after error.');
        }
      }
    });

    console.log('Booking listener started...');
  } catch (error) {
    console.error('Error starting booking listener:', error);
  }
}
