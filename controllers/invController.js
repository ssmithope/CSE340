const invModel = require("../models/inventory-model");
const utilities = require("../utilities");

const invCont = {};

// Fetch inventory by classification
invCont.getByClassificationName = async (req, res, next) => {
  const classificationName = req.params.classificationName;

  try {
    const data = await invModel.getInventoryByClassificationName(classificationName);

    if (!data || data.length === 0) {
      return res.status(404).render("errors/error", {
        title: "No Inventory Found",
        message: `No vehicles found for classification: ${classificationName}.`,
        nav: await utilities.getNav(),
      });
    }

    res.render(`${classificationName.toLowerCase()}`, {
      title: `${classificationName} Vehicles`,
      nav: await utilities.getNav(),
      data,
    });
  } catch (error) {
    next(error);
  }
};

// Fetch vehicle details
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
    next(error);
  }
};

module.exports = invCont;
