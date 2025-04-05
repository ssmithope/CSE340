// Needed Resources 
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController"); // Ensure this matches your controller file name

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory detail view
router.get("/detail/:id", invController.getVehicleDetails);

module.exports = router;
