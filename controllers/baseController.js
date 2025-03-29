const { getNav } = require("../utilities/navigation");

const baseController = {};

// Build Home Page
baseController.buildHome = async (req, res, next) => {
  try {
    const nav = await getNav();
    res.render("index", { title: "Home", nav });
  } catch (error) {
    next(error); // Pass error to middleware
  }
};

// Build Custom Page
baseController.buildCustom = async (req, res, next) => {
  try {
    const vehicle = {
      make: "Custom",
      model: "Flame Decals Edition",
      inv_year: 2023,
      inv_price: 25000,
      inv_miles: 10000,
      inv_image: "/images/vehicles/custom.jpg",
      inv_description: "Personalize your ride with bold flame decals.",
    };

    const upgrades = [
      { name: "Flame Decals", image: "/images/upgrades/flame-decals.jpg" },
      { name: "Bumper Stickers", image: "/images/upgrades/bumper-stickers.jpg" },
      { name: "Hub Caps", image: "/images/upgrades/hub-caps.jpg" },
    ];

    res.render("custom", { title: `${vehicle.make} ${vehicle.model}`, vehicle, upgrades });
  } catch (error) {
    next(error);
  }
};

// Repeat similar structures for Sedan, SUV, and Truck

// Build Sedan Page
baseController.buildSedan = async (req, res, next) => {
  try {
    const vehicle = {
      make: "Sedan",
      model: "Flame Decals Edition",
      inv_year: 2021,
      inv_price: 25000,
      inv_miles: 10000,
      inv_image: "/images/vehicles/sedan.jpg",
      inv_description: "Personalize your ride with bold flame decals.",
    };

    const upgrades = [
      { name: "Flame Decals", image: "/images/upgrades/flame-decals.jpg" },
      { name: "Bumper Stickers", image: "/images/upgrades/bumper-stickers.jpg" },
      { name: "Hub Caps", image: "/images/upgrades/hub-caps.jpg" },
    ];

    res.render("sedan", { title: `${vehicle.make} ${vehicle.model}`, vehicle, upgrades });
  } catch (error) {
    next(error);
  }
};

// Repeat similar structures for Sedan, SUV, and Truck
// Build SUV Page
baseController.buildSUV = async (req, res, next) => {
  try {
    const vehicle = {
      make: "SUV",
      model: "Flame Decals Edition",
      inv_year: 2008,
      inv_price: 25000,
      inv_miles: 10000,
      inv_image: "/images/vehicles/suv.jpg",
      inv_description: "Personalize your ride with bold flame decals.",
    };

    const upgrades = [
      { name: "Flame Decals", image: "/images/upgrades/flame-decals.jpg" },
      { name: "Bumper Stickers", image: "/images/upgrades/bumper-stickers.jpg" },
      { name: "Hub Caps", image: "/images/upgrades/hub-caps.jpg" },
    ];

    res.render("suv", { title: `${vehicle.make} ${vehicle.model}`, vehicle, upgrades });
  } catch (error) {
    next(error);
  }
};

// Repeat similar structures for Sedan, SUV, and Truck

// Build Truck Page
baseController.buildTruck = async (req, res, next) => {
  try {
    const vehicle = {
      make: "Truck",
      model: "Flame Decals Edition",
      inv_year: 1985,
      inv_price: 25000,
      inv_miles: 10000,
      inv_image: "/images/vehicles/truck.jpg",
      inv_description: "Personalize your ride with bold flame decals.",
    };

    const upgrades = [
      { name: "Flame Decals", image: "/images/upgrades/flame-decals.jpg" },
      { name: "Bumper Stickers", image: "/images/upgrades/bumper-stickers.jpg" },
      { name: "Hub Caps", image: "/images/upgrades/hub-caps.jpg" },
    ];

    res.render("truck", { title: `${vehicle.make} ${vehicle.model}`, vehicle, upgrades });
  } catch (error) {
    next(error);
  }
};

// Repeat similar structures for Sedan, SUV, and Truck

module.exports = baseController;
