const { where } = require("sequelize");
const { Activity } = require("../db");

const deleteActivity = async (id) => {
  try {
    await Activity.destroy({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting activity:", error);
  }
};

module.exports = { deleteActivity };
