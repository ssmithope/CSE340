const inventoryModel = require("../models/inventory-model");
const utilities = require("../utilities");

const invController = {};

// Classification view
invController.classificationView = async (req, res, next) => {
  try {
    const classification = req.params.classification;
    const vehicles = await inventoryModel.getVehiclesByClassification(classification);
    res.render("inventory/classification", { title: classification, vehicles });
  } catch (err) {
    next(err);
  }
};

// Vehicle detail view
invController.getVehicleDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const vehicle = await inventoryModel.getVehicleById(id);
    if (!vehicle) {
      return res.status(404).render("errors/error", { message: "Vehicle not found" });
    }
    res.render("inventory/vehicle-detail", { title: `${vehicle.make} ${vehicle.model}`, vehicle });
  } catch (err) {
    next(err);
  }
};

module.exports = invController;
