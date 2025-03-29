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
    res.render("custom", { 
      title: "Custom", 
      image: "/images/upgrades/flame-decals.jpg", 
      details: "Personalize your vehicle with flame decals for a bold, standout look." 
    });
  } catch (error) {
    next(error);
  }
};

// Build Sedan Page
baseController.buildSedan = async (req, res, next) => {
  try {
    res.render("sedan", { 
      title: "Sedan", 
      image: "/images/vehicles/sedan.jpg", 
      details: "Stylish, comfortable, and perfect for city driving." 
    });
  } catch (error) {
    next(error);
  }
};

// Build SUV Page
baseController.buildSUV = async (req, res, next) => {
  try {
    res.render("suv", { 
      title: "SUV", 
      image: "/images/vehicles/suv.jpg", 
      details: "Spacious and powerful, ready for your next adventure." 
    });
  } catch (error) {
    next(error);
  }
};

// Build Truck Page
baseController.buildTruck = async (req, res, next) => {
  try {
    res.render("truck", { 
      title: "Truck", 
      image: "/images/vehicles/truck.jpg", 
      details: "Built tough to handle any job, big or small." 
    });
  } catch (error) {
    next(error);
  }
};

module.exports = baseController;
