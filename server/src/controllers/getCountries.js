const axios = require("axios");
const { Country, Activity } = require("../db");

const getCountries = async () => {
  const countriesCharged = await Country.findAll({
    include: [Activity],
  });

  if (countriesCharged.length === 0) {
    const { data } = await axios(`http://localhost:5000/countries`);
    const countriesData = data.map((country) => ({
      ID: country.cca3,
      name: country.name.common || "No name",
      flagImage: country.flags.png || "No flag",
      continent: Array.isArray(country.continents)
        ? country.continents[0].replace(/"/g, "")
        : country.continents.replace(/"/g, "") || "No Continent",
      capital: Array.isArray(country.capital)
        ? country.capital.join(", ")
        : country.capital || "No Capital",
      subregion: country.subregion || "No subregion",
      population: country.population || 0,
      area: country.area || 0,
      languages: country.languages,
      borders: country.borders,
      coatOfArms: country.coatOfArms.png,
      googleMaps: country.maps.googleMaps,
    }));
    for (const country of countriesData) {
      country.Activities = await Activity.findAll({
        include: [
          {
            model: Country,
            where: { ID: country.ID },
            through: { attributes: [] },
          },
        ],
      });
    }
    await Country.bulkCreate(countriesData, { ignoreDuplicates: true });
    return countriesData;
  } else {
    return countriesCharged;
  }
};

module.exports = { getCountries };
