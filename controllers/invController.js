const invModel = require("../models/inventory-model");
const utilities = require("../utilities");

const invController = {};

/* ***************************
 * Build inventory by classification view
 * ************************** */
invController.buildIntegratedView = async function (req, res, next) {
  try {
    const classification_id = parseInt(req.params.classificationId, 10);
    if (isNaN(classification_id)) {
      return res.status(400).render("./errors/error", {
        title: "Invalid Classification",
        message: "The provided classification ID is invalid.",
      });
    }

    const nav = await utilities.getNav();
    const data = await invModel.getInventoryByClassificationId(classification_id);

    if (!data.length) {
      return res.status(404).render("./errors/error", {
        title: "No Inventory Found",
        message: "There are currently no inventory items in this classification.",
        nav,
      });
    }

    // Get vehicle details (default to the first vehicle)
    const vehicleId = parseInt(req.query.vehicle, 10) || data[0].inv_id;
    const vehicle = data.find(v => v.inv_id === vehicleId);

    const grid = await utilities.buildClassificationGrid(data);

    res.render("inventory/integratedView", {
      nav,
      grid,
      vehicle,
      title: `${data[0].classification_name} Vehicles`,
    });
  } catch (error) {
    console.error("Error in buildIntegratedView:", error.message);
    next(error); // Pass the error to the error handler
  }
};

/* ***************************
 * Build management view
 * ************************** */
invController.buildManagementView = async function (req, res, next) {
  try {
    const nav = await utilities.getNav();
    const classifications = await invModel.getClassifications();
    const classificationSelect = await utilities.buildClassificationList(classifications);

    res.render("inventory/management", {
      title: "Vehicle Management",
      nav,
      classificationSelect,
      flash: req.flash("info"),
    });
  } catch (error) {
    console.error("Error in buildManagementView:", error.message);
    next(error); // Pass the error to the error handler
  }
};

/* ***************************
 * Add classification process
 * ************************** */
invController.addClassification = async function (req, res, next) {
  const { classification_name } = req.body;
  const errors = [];
  const nav = await utilities.getNav();

  // Server-side validation
  const regex = /^[a-zA-Z0-9\s-]+$/;
  if (!regex.test(classification_name)) {
    errors.push({ msg: "Classification name cannot contain special characters." });
  }

  if (errors.length > 0) {
    return res.render("inventory/addClassification", {
      title: "Add Vehicle Classification",
      nav,
      errors,
      flash: null,
    });
  }

  try {
    await invModel.insertClassification(classification_name);
    req.flash("info", "Classification added successfully.");
    res.redirect("/inv");
  } catch (error) {
    console.error("Error in addClassification:", error.message);
    errors.push({ msg: "Error adding classification. Please try again later." });
    res.render("inventory/addClassification", {
      title: "Add Vehicle Classification",
      nav,
      errors,
      flash: null,
    });
  }
};

/* ***************************
 * Show vehicle details by inv_id
 * ************************** */
invController.showVehicleDetail = async function (req, res, next) {
  const inv_id = parseInt(req.params.invId, 10); // Ensure invId is an integer
  if (isNaN(inv_id)) {
    return res.status(400).render("./errors/error", {
      title: "Invalid Vehicle",
      message: "The provided vehicle ID is invalid.",
    });
  }

  try {
    const vehicle = await invModel.getVehicleByInvId(inv_id); // Fetch vehicle details
    const nav = await utilities.getNav(); // Generate navigation menu
    if (!vehicle) {
      return res.status(404).render("./errors/error", {
        title: "Vehicle Not Found",
        message: "No details available for this vehicle.",
        nav,
      });
    }

    res.render("inventory/vehicle-detail", {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      nav,
      vehicle,
    });
  } catch (error) {
    console.error("Error in showVehicleDetail:", error.message);
    next(error); // Pass the error to the error handler
  }
};

/* ***************************
 * Return inventory by classification as JSON
 * ************************** */
invController.getInventoryJSON = async function (req, res, next) {
  const classification_id = parseInt(req.params.classification_id, 10);
  if (isNaN(classification_id)) {
    return res.status(400).json({ error: "Invalid classification ID." });
  }

  try {
    const invData = await invModel.getInventoryByClassificationId(classification_id);
    if (invData.length > 0) {
      return res.json(invData);
    } else {
      return res.status(404).json({ error: "No inventory found for this classification." });
    }
  } catch (error) {
    console.error("Error in getInventoryJSON:", error.message);
    next(error);
  }
};

module.exports = invController;
