const utilities = require("../utilities/");
const baseController = {};

baseController.buildHome = async function (req, res) {
  try {
    const nav = await utilities.getNav().catch(() => {
      console.error("Navigation data could not be retrieved.");
      return []; // Default navigation if fetching fails
    });
    res.render("index", { title: "Home", nav });
  } catch (error) {
    console.error("Error building home:", error.stack);
    res.status(500).render("errors", {
      title: "500 Error",
      message: "Internal Server Error",
    });
  }
};

module.exports = baseController;
