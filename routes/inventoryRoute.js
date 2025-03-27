const express = require("express");
const invController = require("../controllers/invController");
const errorController = require("../controllers/errorController");

const router = express.Router();

router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/detail/:invId", invController.showVehicleDetail);
router.get("/trigger-error", errorController.throwError);

module.exports = router;
