const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;

  try {
    const data = await invModel.getInventoryByClassificationId(classification_id);

    // Handle case where data is undefined or empty
    if (!data || data.length === 0) {
      console.error(`No inventory found for classification ID: ${classification_id}`);
      return res.status(404).send("No inventory found for this classification.");
    }

    const grid = await utilities.buildClassificationGrid(data);
    const nav = await utilities.getNav();
    const className = data[0].classification_name;

    res.render("./inventory/classification", {
      title: `${className} vehicles`,
      nav,
      grid,
    });
  } catch (error) {
    console.error("Error building inventory by classification ID:", error);
    next(error); // Pass error to middleware
  }
};

module.exports = invCont;
