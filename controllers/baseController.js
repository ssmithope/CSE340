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
    if (!vehicle) throw new Error("Vehicle data is missing.");
    if (!Array.isArray(upgrades) || upgrades.length === 0) {
      throw new Error("Upgrades data is missing or invalid.");
    }
    const nav = await getNav();
    res.render("inventory/vehicle-detail", { title, vehicle, upgrades, nav }); // Correct view path
  } catch (error) {
    console.error(`Error in buildVehiclePage: ${error.message}`);
    next(error);
  }
};

// Build Home Page
baseController.buildHome = async (req, res, next) => {
  try {
    const nav = await getNav();
    res.render("index", { title: "Home", nav });
  } catch (error) {
    console.error("Failed to fetch navigation data:", error.message);
    res.render("index", { title: "Home", nav: [] });
  }
};

// Build Custom Page
baseController.buildCustom = async (req, res, next) => {
  const vehicle = {
    make: "Custom",
    model: "Flame Decals Edition",
    inv_year: 2009,
    inv_price: Number(25000).toLocaleString("en-US"),
    inv_miles: Number(10000).toLocaleString("en-US"),
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
    inv_year: 2011,
    inv_price: Number(9000).toLocaleString("en-US"),
    inv_miles: Number(109000).toLocaleString("en-US"),
    inv_image: "/images/vehicles/sedan.jpg",
    inv_description: "Experience elegance with this stylish sedan featuring flame decals.",
  };
  baseController.buildVehiclePage(req, res, next, vehicle, `CSE Motors - ${vehicle.make} ${vehicle.model}`);
};

// Build SUV Page
baseController.buildSUV = async (req, res, next) => {
  const vehicle = {
    make: "SUV",
    model: "Flame Decals Edition",
    inv_year: 2023,
    inv_price: Number(95000).toLocaleString("en-US"),
    inv_miles: Number(100).toLocaleString("en-US"),
    inv_image: "/images/vehicles/suv.jpg",
    inv_description: "Conquer every terrain with this robust SUV enhanced by bold flame decals.",
  };
  baseController.buildVehiclePage(req, res, next, vehicle, `CSE Motors - ${vehicle.make} ${vehicle.model}`);
};

// Build Truck Page
baseController.buildTruck = async (req, res, next) => {
  const vehicle = {
    make: "Truck",
    model: "Flame Decals Edition",
    inv_year: 2024,
    inv_price: Number(85000).toLocaleString("en-US"),
    inv_miles: Number(109).toLocaleString("en-US"),
    inv_image: "/images/vehicles/truck.jpg",
    inv_description: "Built tough for every challenge, now with bold flame decals to stand out.",
  };
  baseController.buildVehiclePage(req, res, next, vehicle, `CSE Motors - ${vehicle.make} ${vehicle.model}`);
};

module.exports = baseController;
