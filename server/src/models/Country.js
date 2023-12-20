const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Country = sequelize.define("Country", {
  id: {
    type: DataTypes.STRING(3),
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  flagImage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  continent: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capital: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subregion: {
    type: DataTypes.STRING,
  },
  area: {
    type: DataTypes.FLOAT,
  },
  population: {
    type: DataTypes.INTEGER,
    allownull: false,
  },
});

module.exports = Country;
