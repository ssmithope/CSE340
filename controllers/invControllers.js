import { getInventoryByClassificationId, getVehicleByInvId } from "../models/inventory-model.js";
import { buildClassificationGrid, buildGetVehicleByIdGrid, getNav } from "../utilities/index.js";

const invController = {};

invController.buildByClassificationId = async (req, res, next) => {
    try {
        const classificationId = req.params.classificationId;
        const data = await getInventoryByClassificationId(classificationId);
        const grid = await buildClassificationGrid(data);
        const nav = await getNav();
        res.render("inventory/classification", { title: `${data[0].classification_name} Vehicles`, grid, nav });
    } catch (err) {
        next(err);
    }
};

invController.showVehicleDetail = async (req, res, next) => {
    try {
        const invId = req.params.invId;
        const vehicle = await getVehicleByInvId(invId);
        const grid = await buildGetVehicleByIdGrid([vehicle]);
        const nav = await getNav();
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

export default invController;
