const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Activity = sequelize.define("Activity", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  difficulty: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 1,
      max: 5,
    },
  },
  duration: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  season: {
    type: DataTypes.ENUM("verano", "otoño", "invierno", "primavera"),
    allowNull: false,
  },
});

module.exports = Activity;
