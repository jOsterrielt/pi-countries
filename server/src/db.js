require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require("node:fs");
const path = require("node:path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const CountryModel = require("./models/Country");
const ActivityModel = require("./models/Activity");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);

ActivityModel(sequelize);
CountryModel(sequelize);

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Country, Activity } = sequelize.models;

Country.belongsToMany(Activity, { through: "Country_activities" });
Activity.belongsToMany(Country, { through: "Country_activities" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
