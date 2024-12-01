import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db-config.js';

class Airport extends Model {}

Airport.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    airportName: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    iataCode: {
      type: DataTypes.STRING(3),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 3], 
      },
    },
    country: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    countryCode: {
      type: DataTypes.STRING(3),
      allowNull: false,
      validate: {
        len: [2, 3], // ISO 3166 format
      },
    },
    city: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    cityCode: {
      type: DataTypes.STRING(3),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'airports',
    timestamps: true, 
    indexes: [
        { fields: ['iata_code'], unique: true },
        { fields: ['city_code'], unique: true },
      ],
  }
);

export default Airport;
