const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.get('/inventory/:id', inventoryController.getVehicleDetail);

module.exports = router;
