const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Country",
    {
      ID: {
        type: DataTypes.STRING(3),
        primaryKey: true,
      },
      flagImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      continent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capital: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      subregion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      area: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      population: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      languages: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      borders: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      coatOfArms: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      googleMaps: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
