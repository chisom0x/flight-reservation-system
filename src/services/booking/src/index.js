import 'dotenv/config';
import createServer from './app.js';
import sequelize from './config/db-config.js';
import { confirmBookingListener } from './utils/booking-listener.js';

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Booking Service database connected!');
    await sequelize.sync({ force: false, alter: true });

    const server = createServer();
    const port = 3003;

    server.listen(port, () => {
      console.log(`Booking Service running on ${port}!`);
    });
  } catch (error) {
    console.log(error);
  }
};

connectDB();
confirmBookingListener();
