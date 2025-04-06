const inventoryModel = require('../models/inventoryModel');
const utilities = require('../utilities');

async function getVehicleDetail(req, res, next) {
    try {
        const id = req.params.id;
        const vehicle = await inventoryModel.getVehicleById(id);
        if (!vehicle) {
            return res.status(404).render('error', { message: 'Vehicle not found' });
        }
        const htmlContent = utilities.wrapVehicleDetail(vehicle);
        res.status(200).send(htmlContent);
    } catch (err) {
        next(err); // Passes error to middleware
    }
}

module.exports = { getVehicleDetail };
