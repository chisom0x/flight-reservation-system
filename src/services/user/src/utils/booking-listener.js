import amqp from 'amqplib';
import userRepository from '../repositories/user-repository.js';

export async function bookingListener() {
  try {
    const connection = await amqp.connect('amqp://guest:guest@localhost');
    const channel = await connection.createChannel();
    const exchange = 'user-exchange';
    const routingKey = 'user.booking';
    const queueName = 'user-queue';

    await channel.assertExchange(exchange, 'direct', { durable: true });
    await channel.assertQueue(queueName, { durable: true });

    await channel.bindQueue(queueName, exchange, routingKey);

    channel.consume(queueName, async (msg) => {
      if (msg) {
        try {
          const userId = JSON.parse(msg.content.toString());
          const convertedUserId = parseInt(userId);

          const user = await userRepository.findUserById(convertedUserId);

          await channel.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(
              JSON.stringify({
                email: user.email,
                error: null,
              })
            ),
            {
              correlationId: msg.properties.correlationId,
            }
          );

          channel.ack(msg);
        } catch (error) {
          console.error('Error finding user:', error);

          await channel.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(
              JSON.stringify({
                error: 'Failed to find user',
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
    console.error('Error starting payment listener:', error);
    throw error;
  }
}
