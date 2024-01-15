const { getCountriesById } = require("../controllers/getCountriesById");

const getCountriesByIdHandler = async (req, res) => {
  try {
    const { countryId } = req.params;
    const country = await getCountriesById(countryId);

    if (!country) return res.status(404).json({ message: "Country Not Found" });

    return res.status(200).json(country);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
module.exports = { getCountriesByIdHandler };
