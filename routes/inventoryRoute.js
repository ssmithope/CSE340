// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const errorController = require("../controllers/errorController");
const utilities = require("../utilities");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to show vehicle details by inv_id
router.get("/vehicle/:invId", utilities.handleErrors(invController.showVehicleDetail));

// Route to display the management view
router.get("/", utilities.handleErrors(invController.buildManagementView));

// Routes for adding a new classification
router.get("/add-classification", utilities.handleErrors(invController.showAddClassification));
router.post("/add-classification", utilities.handleErrors(invController.addClassification));

// Route to get inventory JSON by classification_id
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON));

// Routes for adding a new vehicle to the inventory
router.get("/add-inventory", utilities.handleErrors(invController.showAddInventoryForm));
router.post("/add-inventory", utilities.handleErrors(invController.addInventory));

// Route to trigger an error for testing purposes
router.get("/trigger-error", utilities.handleErrors(errorController.throwError));

module.exports = router;
