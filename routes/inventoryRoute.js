// Needed Resources 
//const express = require("express")
//const router = new express.Router() 
//const invController = require("../controllers/invController");

// Route to build inventory by classification view
//router.get("/type/:classificationId", invController.buildByClassificationId);

//module.exports = router;


//const express = require("express");
//const router = express.Router();
//const invController = require("../controllers/invController");

// Route to retrieve details for a specific vehicle
//router.get("/vehicle/:id", invController.getVehicleDetails);

//module.exports = router;


import express from "express";
import invController from "../controllers/invController.js";
const router = express.Router();

// Route to deliver specific vehicle detail
router.get("/detail/:inventory_id", invController.buildDetailView);

export default router;
