const { deleteActivity } = require("../controllers/deleteActivity");

const deleteActivityHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteActivity(id);
    res.status(204).json({ message: "Activity deleted successfully" });
  } catch (error) {
    console.error("Error deleting activity:", error);
    res.status(500).json({ error: "Error deleting activity" });
  }
};
module.exports = { deleteActivityHandler };
