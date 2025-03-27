// Needed Resources
const express = require("express");
const router = express.Router(); // Simplified the router initialization
const invController = require("../controllers/invController");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Default Inventory Home route
router.get("/", (req, res) => {
  res.send("Inventory Home");
});

module.exports = router;
