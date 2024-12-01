import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db-config.js';

class Flight extends Model {}

Flight.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    flightNumber: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    departureAirportId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'airports', 
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    arrivalAirportId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'airports',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    departureDate: {
      type: DataTypes.DATEONLY, // Only stores the date
      allowNull: false,
    },
    departureTime: {
      type: DataTypes.TIME, // Stores only the time
      allowNull: false,
    },
    arrivalTime: {
      type: DataTypes.TIME, // Stores only the time
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING(10), // Format: "HH:mm"
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    airlineName: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    seatsAvailable: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    status: {
      type: DataTypes.ENUM('scheduled', 'delayed', 'cancelled', 'departed', 'landed'),
      allowNull: false,
      defaultValue: 'scheduled',
    },
  },
  {
    sequelize,
    tableName: 'flights',
    timestamps: true, // Adds createdAt and updatedAt
  }
);

export default Flight;
