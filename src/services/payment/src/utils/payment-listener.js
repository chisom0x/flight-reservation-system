import amqp from 'amqplib';
import axios from 'axios';

export async function paymentListener() {
  try {
    const connection = await amqp.connect('amqp://guest:guest@localhost');
    const channel = await connection.createChannel();
    const exchange = 'payment-exchange';
    const routingKey = 'payment.initiate';
    const queueName = 'payment-queue';

    await channel.assertExchange(exchange, 'direct', { durable: true });
    await channel.assertQueue(queueName, { durable: true });
    
    await channel.bindQueue(queueName, exchange, routingKey);

    channel.consume(
      queueName,
      async (msg) => {
        if (msg) {
          try {
            const paymentDetails = JSON.parse(msg.content.toString());
            const { userId, email, totalPrice } = paymentDetails;

            const paystackResponse = await axios.post(
              'https://api.paystack.co/transaction/initialize',
              {
                email,
                amount: totalPrice * 100,
              },
              {
                headers: {
                  Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                  'Content-Type': 'application/json',
                },
              }
            );

            const { authorization_url, reference } = paystackResponse.data.data;

            await channel.sendToQueue(
              msg.properties.replyTo,
              Buffer.from(JSON.stringify({
                authorizationUrl: authorization_url,
                reference,
                error: null,
              })),
              {
                correlationId: msg.properties.correlationId,
              }
            );

            channel.ack(msg);
          } catch (error) {
            console.error('Payment initialization error:', error);
            
            // Send error response
            await channel.sendToQueue(
              msg.properties.replyTo,
              Buffer.from(JSON.stringify({
                error: 'Failed to initialize payment',
              })),
              {
                correlationId: msg.properties.correlationId,
              }
            );

            channel.ack(msg);
          }
        }
      }
    );

    console.log('Payment listener started...');
  } catch (error) {
    console.error('Error starting payment listener:', error);
    throw error
  }
}
