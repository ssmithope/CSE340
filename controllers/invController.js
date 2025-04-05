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
    const nav = await utilities.getNav();

    if (!data || data.length === 0) {
      return res.status(404).render("errors/error", {
        title: "No Inventory Found",
        message: `No vehicles found for classification ID: ${classification_id}.`,
        nav,
      });
    }

    const grid = await utilities.buildClassificationGrid(data);
    const className = data[0]?.classification_name || "Unknown";

    res.render("inventory/classification", {
      title: `${className} Vehicles`,
      nav,
      grid,
    });
  } catch (error) {
    console.error(`Error building inventory for classification ID ${classification_id}:`, error);
    next(error);
  }
};

/* ***************************
 *  Build vehicle detail view
 * ************************** */
invCont.getVehicleDetails = async (req, res, next) => {
  try {
    const id = req.params.id;
    const vehicle = await invModel.getVehicleById(id);

    if (!vehicle) {
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

module.exports = invCont;
