const { Country } = require("../db");

const getLanguages = async () => {
  try {
    const countries = await Country.findAll();
    const allLanguages = countries.reduce((acc, country) => {
      if (country.languages) {
        const countryLanguages = Object.values(country.languages);
        acc.push(...countryLanguages);
      }
      return acc;
    }, []);

    const uniqueLanguages = [...new Set(allLanguages)];

    return uniqueLanguages;
  } catch (error) {
    console.error("Error getting languages:", error);
    throw error;
  }
};

module.exports = { getLanguages };
