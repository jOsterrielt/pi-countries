const { Router } = require("express");
const { getCountriesHandler } = require("../handlers/getCountriesHandler");
const {
  getCountriesByIdHandler,
} = require("../handlers/getCountriesByIdHandler");
const {
  getCountriesByNameHandler,
} = require("../handlers/getCountriesByNameHandler");
const { getActivitiesHandler } = require("../handlers/getActivitiesHandler");
const { postActivitiesHandler } = require("../handlers/postActivitiesHandler");
const { deleteActivityHandler } = require("../handlers/deleteActivityHandler");

const router = Router();

router.get("/countries", getCountriesHandler);
router.get("/countries/name", getCountriesByNameHandler);
router.get("/countries/:countryId", getCountriesByIdHandler);
router.get("/activities", getActivitiesHandler);

router.post("/activities", postActivitiesHandler);

router.delete("/activities/:id", deleteActivityHandler);

module.exports = router;
