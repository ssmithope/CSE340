const utilities = require("../utilities/");
const baseController = {};

baseController.buildHome = async function (req, res, next) {
  try {
    const nav = await utilities.getNav();

    // Log for debugging
    console.log("Navigation data generated:", nav);

    res.render("index", {
      title: "Home",
      nav,
      errors: null,
    });
  } catch (error) {
    console.error("Error in buildHome:", error.message);

    // Pass the error to the next middleware (express error handler)
    next(error);
  }
};

module.exports = baseController;
