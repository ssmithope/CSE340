// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const inventoryRoute = require("./routes/inventory"); // Adjust the path based on your project structure


// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/", (req, res) => {
    res.send("Inventory Home");
  });

module.exports = router;
