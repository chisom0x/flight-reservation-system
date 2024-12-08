import amqp from 'amqplib';
import AppError from '../../../../shared/error-handling/app-error.js';

export default class UserHandler {
  static async getUser(userId) {
    const correlationId = `corr-${Math.floor(Math.random() * 1000000)}`;
    const connection = await amqp.connect('amqp://guest:guest@localhost');
    const channel = await connection.createChannel();
    const exchange = 'user-exchange';
    const routingKey = 'user.booking';
    const responseQueue = `user-response-${Date.now()}`;

    await channel.assertExchange(exchange, 'direct', { durable: true });
    await channel.assertQueue(responseQueue, { exclusive: true });

    const responseConsumer = new Promise((resolve, reject) => {
      channel.consume(
        responseQueue,
        (msg) => {
          if (msg.properties.correlationId === correlationId) {
            const response = JSON.parse(msg.content.toString());
            if (response.error) {
              reject(new AppError(response.error, 500));
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

    await channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(userId)),
      {
        replyTo: responseQueue,
        correlationId,
      }
    );

    return responseConsumer;
  }
}
