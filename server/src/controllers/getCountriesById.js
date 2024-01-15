const { Country, Activity } = require("../db");

const getCountriesById = async (countryId) => {
  return await Country.findAll({
    where: { ID: countryId },
    include: Activity,
  });
};

module.exports = { getCountriesById };
