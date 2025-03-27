const invModel = require("../models/inventory-model");
const utilities = require("../utilities/index");

const invController = {};

invController.buildByClassificationId = async (req, res, next) => {
    try {
        const classificationId = req.params.classificationId;
        const data = await invModel.getInventoryByClassificationId(classificationId);
        const grid = await utilities.buildClassificationGrid(data);
        const nav = await utilities.getNav();
        res.render("inventory/classification", { title: `${data[0].classification_name} Vehicles`, grid, nav });
    } catch (err) {
        next(err);
    }
};

invController.showVehicleDetail = async (req, res, next) => {
    try {
        const invId = req.params.invId;
        const vehicle = await invModel.getVehicleByInvId(invId);
        const grid = await utilities.buildGetVehicleByIdGrid([vehicle]);
        const nav = await utilities.getNav();
        res.render("inventory/vehicle-detail", {
            title: `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`,
            vehicle,
            grid,
            nav,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = invController;
