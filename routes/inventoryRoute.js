// Needed Resources 
//const express = require("express")
//const router = new express.Router() 
//const invController = require("../controllers/invController");

// Route to build inventory by classification view
//router.get("/type/:classificationId", invController.buildByClassificationId);

//module.exports = router;


const express = require("express");
const router = express.Router();
const invController = require("../controllers/invController");

// Route to retrieve details for a specific vehicle
router.get("/vehicle/:id", invController.getVehicleDetails);

module.exports = router;

