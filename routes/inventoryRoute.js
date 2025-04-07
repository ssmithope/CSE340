const express = require("express");
const router = express.Router();
const invController = require("../controllers/invController"); // Ensure the correct path

// Define route for classification view
router.get("/classification/:classification", invController.classificationView);

// Define route for vehicle detail view
router.get("/:id", invController.getVehicleDetail);

module.exports = router;
