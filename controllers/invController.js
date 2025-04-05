const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const inventoryController = {}; // Ensure controller object is initialized

// Function to build inventory by classification
inventoryController.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;

  try {
    const data = await invModel.getInventoryByClassificationId(classification_id);
    const nav = await utilities.getNav();

    if (!data || data.length === 0) {
      console.error(`No inventory found for classification ID: ${classification_id}`);
      return res.status(404).render("errors/error", {
        title: "No Inventory Found",
        message: `No vehicles found for classification ID: ${classification_id}.`,
        nav,
      });
    }

    const grid = await utilities.buildClassificationGrid(data);
    const className = data[0]?.classification_name || "Unknown";

    res.render("inventory/classification", {
      title: `${className} vehicles`,
      nav,
      grid,
    });
  } catch (error) {
    console.error(`Error building inventory for classification ID ${classification_id}:`, error);
    next(error); 
  }
};

// Function to build vehicle detail view
inventoryController.getVehicleDetails = async (req, res, next) => {
  try {
    const id = req.params.id;
    const vehicle = await invModel.getVehicleById(id);

    if (!vehicle) {
      console.error(`No vehicle found for ID: ${id}`);
      return res.status(404).render("errors/error", {
        title: "Vehicle Not Found",
        message: "The requested vehicle does not exist.",
        nav: await utilities.getNav(),
      });
    }

    res.render("vehicle-detail", {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      vehicle,
      nav: await utilities.getNav(),
    });
  } catch (error) {
    console.error("Error fetching vehicle details:", error);
    next(error);
  }
};

module.exports = inventoryController; // Ensure this exports the object correctly
