// Required dependencies
const express = require("express");
const router = express.Router(); // Create a router instance
const invController = require("../controllers/invController"); // Import the controller

// Route to fetch inventory by classification ID
router.get("/type/:classificationId", invController.buildByClassificationId);

// Default Inventory Home route (Optional: modify as needed)
router.get("/", (req, res) => {
  res.send("Welcome to the Inventory Home Page");
});

module.exports = router;
