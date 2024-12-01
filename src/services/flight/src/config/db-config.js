import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  'postgres://postgres:kelvin@localhost:5432/fls_flight_db',
  {
    dialect: 'postgres',
    logging: false,
  }
);

export default sequelize;
