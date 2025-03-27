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


//const inventoryModel = require('../models/inventory-model');
//const utilities = require('../utilities/index');

//exports.getVehicleDetails = async (req, res, next) => {
//    try {
//        const vehicleId = req.params.id; // Retrieve the vehicle ID from URL
//        const vehicleData = await inventoryModel.getVehicleById(vehicleId); // Fetch vehicle data
//        const htmlContent = utilities.wrapVehicleDataInHTML(vehicleData); // Convert data to HTML
//        res.send(htmlContent); // Send the response
//   } catch (error) {
//        next(error); // Pass error to middleware
//    }
//};

import invModel from "../models/inventory-model.js";
import utilities from "../utilities/index.js";

/**
 * Builds the detail view for a specific inventory item.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 */
export async function buildDetailView(req, res, next) {
    try {
        // Extract inventory ID from the URL parameters
        const inventoryId = req.params.inventory_id;

        // Fetch vehicle data based on the inventory ID
        const vehicleData = await invModel.getVehicleById(inventoryId);

        // If no vehicle is found, throw an error to be handled by middleware
        if (!vehicleData) {
            const error = new Error("Vehicle not found");
            error.status = 404; // Set HTTP status code to 404
            throw error;
        }

        // Generate the HTML string for the vehicle details using utility function
        const htmlString = utilities.wrapVehicleHTML(vehicleData);

        // Render the inventory detail view with the vehicle data
        res.render("inventory/detail", {
            title: `${vehicleData.make} ${vehicleData.model}`, // Set page title
            vehicleHTML: htmlString, // Pass the generated HTML to the view
        });
    } catch (error) {
        // Pass any errors to the Express error handling middleware
        next(error);
    }
}
