// Needed Resources
const express = require("express");
const router = express.Router();
const invController = require("../controllers/invController");
router.get("/:id", invController.getVehicleDetails); // Ensure this function exists and is defined


// Validation middleware for classificationId
function validateClassificationId(req, res, next) {
  const classificationId = parseInt(req.params.classificationId, 10);
  if (isNaN(classificationId)) {
    return res.status(400).send("Invalid classification ID");
  }
  next();
}

// Route for specific inventory item detail view
router.get("/:id", invController.getVehicleDetails);

// Route to build inventory by classification view
router.get("/type/:classificationId", validateClassificationId, invController.buildByClassificationId);

// Default Inventory Home route
router.get("/", (req, res) => {
  res.render("inventory/home", { title: "Inventory Home" });
});

module.exports = router;
