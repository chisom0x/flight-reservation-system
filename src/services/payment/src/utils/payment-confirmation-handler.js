import axios from 'axios';
import amqp from 'amqplib';

function generateCorrelationId() {
  return `corr-${Math.floor(Math.random() * 1000000)}`;
}

export default class PaymentConfirmationHandler {
  static async verifyTransaction(reference) {
    const verificationUrl = `https://api.paystack.co/transaction/verify/${reference}`;
    const response = await axios.get(verificationUrl, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    return response.data.data;
  }

  static async confirmPaymentWithQueue(reference) {
    const correlationId = generateCorrelationId();
    const connection = await amqp.connect('amqp://guest:guest@localhost');
    const channel = await connection.createChannel();
    const exchange = 'confirm-payment-exchange';
    const routingKey = 'payment.confirm';
    const responseQueue = `confirm-payment-response-${Date.now()}`;

    await channel.assertExchange(exchange, 'direct', { durable: true });
    await channel.assertQueue(responseQueue, { exclusive: true });

    channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify({ reference })),
      {
        replyTo: responseQueue,
        correlationId,
      }
    );

    const responseConsumer = new Promise((resolve, reject) => {
      channel.consume(
        responseQueue,
        (msg) => {
          const response = JSON.parse(msg.content.toString());

          if (msg.properties.correlationId === correlationId) {
            if (response.error) {
              reject(response.error);
            } else {
              resolve(response);
            }

            channel.close();
            connection.close();
          }
        },
        { noAck: true }
      );
    });

    return responseConsumer;
  }
}
