const invModel = require("../models/inventory-model"); // Match file name
const utilities = require("../utilities/");

const invController = {};

/* ***************************
 * Get Vehicle Details
 * ************************** */
invController.getVehicleDetails = async (req, res, next) => {
  try {
    const vehicleId = req.params.id; // Get inventory ID from URL
    const vehicle = await invModel.getVehicleById(vehicleId); // Use consistent naming
    if (!vehicle) {
      res.status(404).render("errors/errors", {
        title: "404 Error",
        message: "Vehicle not found",
      });
      return;
    }
    res.render("inventory/vehicle-detail", {
      title: `${vehicle.make} ${vehicle.model}`,
      vehicle,
    });
  } catch (error) {
    next(error); // Pass errors to middleware
  }
};

/* ***************************
 * Build inventory by classification view
 * ************************** */
invController.buildByClassificationId = async (req, res, next) => {
  const classification_id = req.params.classificationId;

  try {
    const data = await invModel.getInventoryByClassificationId(classification_id);

    if (!data || data.length === 0) {
      const nav = await utilities.getNav();
      return res.status(404).render("inventory/classification", {
        title: "No vehicles found",
        nav,
        grid: '<p class="notice">No vehicles found for this classification.</p>',
      });
    }

    const grid = await utilities.buildClassificationGrid(data);
    const nav = await utilities.getNav();
    const className = data[0].classification_name;

    res.render("inventory/classification", {
      title: `${className} vehicles`,
      nav,
      grid,
    });
  } catch (error) {
    next(error);
  }
};

/* ***************************
 * Render Home Page
 * ************************** */
invController.renderHomePage = async (req, res, next) => {
  try {
    const classifications = await utilities.getClassifications();
    if (!classifications || classifications.length === 0) {
      throw new Error("No classifications found");
    }

    const nav = await utilities.buildNav(classifications);
    res.render("index", { nav });
  } catch (error) {
    next(error);
  }
};

module.exports = invController;
