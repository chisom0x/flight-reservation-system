import 'dotenv/config';
import createServer from './app.js';
import { paymentListener } from './utils/payment-listener.js';
import sequelize from './config/db-config.js';

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Payment Service database connected!');
    await sequelize.sync({ force: false, alter: true });

    const server = createServer();
    const port = process.env.PORT || 3004;

    server.listen(port, () => {
      console.log(`Payment Service running on ${port}!`);
    });
  } catch (error) {
    console.log(error);
  }
};

connectDB();
paymentListener();
