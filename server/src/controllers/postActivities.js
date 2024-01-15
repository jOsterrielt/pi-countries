const { Activity } = require("../db");

const createActivity = async ({
  name,
  difficulty,
  duration,
  season,
  countries,
}) => {
  const NewActivity = await Activity.create({
    name,
    difficulty,
    duration,
    season,
  });

  await NewActivity.setCountries(countries);

  return NewActivity;
};

module.exports = { createActivity };
