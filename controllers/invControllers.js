//const invModel = require("../models/inventory-model")
//const utilities = require("../utilities/")

//const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
//invCont.buildByClassificationId = async function (req, res, next) {
//  const classification_id = req.params.classificationId
//  const data = await invModel.getInventoryByClassificationId(classification_id)
//  const grid = await utilities.buildClassificationGrid(data)
//  let nav = await utilities.getNav()
//  const className = data[0].classification_name
//  res.render("./inventory/classification", {
//    title: className + " vehicles",
//    nav,
//    grid,
//  })
//}


//module.exports = invCont


const inventoryModel = require('../models/inventory-model');
const utilities = require('../utilities/index');

exports.getVehicleDetails = async (req, res, next) => {
    try {
        const vehicleId = req.params.id; // Retrieve the vehicle ID from URL
        const vehicleData = await inventoryModel.getVehicleById(vehicleId); // Fetch vehicle data
        const htmlContent = utilities.wrapVehicleDataInHTML(vehicleData); // Convert data to HTML
        res.send(htmlContent); // Send the response
    } catch (error) {
        next(error); // Pass error to middleware
    }
};
