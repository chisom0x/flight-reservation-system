import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db-config.js';

class Booking extends Model {}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    flightId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numberOfPassengers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paymentStatus: {
      type: DataTypes.ENUM('paid', 'unpaid'),
      defaultValue: 'unpaid',
      allowNull: false,
    },
    payStackRef: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'bookings',
    timestamps: true,
  }
);

export default Booking;
