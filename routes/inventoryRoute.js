const express = require("express");
const router = express.Router();
const invController = require("../controllers/invController");

// Route for classification views (e.g., sedan, SUV, etc.)
router.get("/classification/:classification", invController.classificationView);

// Route for vehicle detail views
router.get("/:id", invController.getVehicleDetail);

module.exports = router;
