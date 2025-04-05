const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");

router.get("/type/:classificationName", invController.getByClassificationName);
router.get("/detail/:id", invController.getVehicleDetails);

// Intentional 500 Error Route
router.get("/trigger-error", (req, res, next) => {
  const error = new Error("This is a simulated server error.");
  error.status = 500;
  next(error);
});

module.exports = router;
