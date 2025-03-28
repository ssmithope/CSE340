// Needed Resources
const express = require("express");
const router = express.Router();
const invController = require("../controllers/invController");

// Validation middleware for classificationId
function validateClassificationId(req, res, next) {
  const classificationId = parseInt(req.params.classificationId, 10);
  if (isNaN(classificationId)) {
    return res.status(400).send("Invalid classification ID");
  }
  next();
}

// Route to build inventory by classification view
router.get("/type/:classificationId", validateClassificationId, invController.buildByClassificationId);

// Default Inventory Home route
router.get("/", (req, res) => {
  res.render("inventory/home", { title: "Inventory Home" });
});

module.exports = router;
