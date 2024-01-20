const { getLanguages } = require("../controllers/getLanguages");

const getLanguagesHandler = async (req, res) => {
  try {
    const languages = await getLanguages();
    console.log(languages);
    return res.status(200).json(languages);
  } catch (error) {
    console.error("Error handling languages request:", error);
    res.status(500).send("Internal Server Error");
  }
};
module.exports = { getLanguagesHandler };
