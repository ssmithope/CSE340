const { getNav } = require("../utilities/navigation");

const baseController = {};

// Reusable Upgrades Array
const upgrades = [
  { name: "Flame Decals", image: "/images/upgrades/flame-decals.jpg" },
  { name: "Bumper Stickers", image: "/images/upgrades/bumper-stickers.jpg" },
  { name: "Hub Caps", image: "/images/upgrades/hub-caps.jpg" },
];

// Reusable Function to Render Vehicle Pages
baseController.buildVehiclePage = async (req, res, next, vehicle, title) => {
  try {
    const nav = await getNav();
    res.render("vehicle", { title, vehicle, upgrades, nav });
  } catch (error) {
    next(error);
  }
};

// Build Home Page
baseController.buildHome = async (req, res, next) => {
  try {
    const nav = await getNav();
    res.render("index", { title: "Home", nav });
  } catch (error) {
    next(error);
  }
};

// Build Custom Page
baseController.buildCustom = async (req, res, next) => {
  const vehicle = {
    make: "Custom",
    model: "Flame Decals Edition",
    inv_year: 2023,
    inv_price: 25000,
    inv_miles: 10000,
    inv_image: "/images/vehicles/custom.jpg",
    inv_description: "Personalize your ride with bold flame decals.",
  };
  baseController.buildVehiclePage(req, res, next, vehicle, `CSE Motors - ${vehicle.make} ${vehicle.model}`);
};

// Build Sedan Page
baseController.buildSedan = async (req, res, next) => {
  const vehicle = {
    make: "Sedan",
    model: "Flame Decals Edition",
    inv_year: 2021,
    inv_price: 25000,
    inv_miles: 10000,
    inv_image: "/images/vehicles/sedan.jpg",
    inv_description: "A stylish sedan enhanced with bold flame decals.",
  };
  baseController.buildVehiclePage(req, res, next, vehicle, `CSE Motors - ${vehicle.make} ${vehicle.model}`);
};

// Build SUV Page
baseController.buildSUV = async (req, res, next) => {
  const vehicle = {
    make: "SUV",
    model: "Flame Decals Edition",
    inv_year: 2008,
    inv_price: 25000,
    inv_miles: 10000,
    inv_image: "/images/vehicles/suv.jpg",
    inv_description: "A powerful SUV with bold flame decals.",
  };
  baseController.buildVehiclePage(req, res, next, vehicle, `CSE Motors - ${vehicle.make} ${vehicle.model}`);
};

// Build Truck Page
baseController.buildTruck = async (req, res, next) => {
  const vehicle = {
    make: "Truck",
    model: "Flame Decals Edition",
    inv_year: 1985,
    inv_price: 25000,
    inv_miles: 10000,
    inv_image: "/images/vehicles/truck.jpg",
    inv_description: "This rugged truck is equipped with bold flame decals.",
  };
  baseController.buildVehiclePage(req, res, next, vehicle, `CSE Motors - ${vehicle.make} ${vehicle.model}`);
};

module.exports = baseController;
