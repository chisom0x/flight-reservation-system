import 'dotenv/config';
import createServer from './app.js';
import sequelize from './config/db-config.js';

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Flight Service database connected!');
    await sequelize.sync({ force: false, alter: true });

    const server = createServer();
    const port = process.env.PORT || 3002;

    server.listen(port, () => {
      console.log(`Flight Service running on ${port}!`);
    });
  } catch (error) {
    console.log(error);
  }
};

connectDB();
