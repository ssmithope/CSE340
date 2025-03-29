const { getNav } = require("../utilities/navigation");

const baseController = {};

baseController.buildHome = (req, res) => {
  res.render("index", { title: "Home" });
};

baseController.buildCustom = (req, res) => {
  res.render("custom", { 
    title: "Custom", 
    image: "/images/upgrades/flame-decals.jpg", 
    details: "Personalize your vehicle with flame decals for a bold, standout look." 
  });
};

baseController.buildSedan = (req, res) => {
  res.render("sedan", { 
    title: "Sedan", 
    image: "/images/vehicles/sedan.jpg", 
    details: "Stylish, comfortable, and perfect for city driving." 
  });
};

baseController.buildSUV = (req, res) => {
  res.render("suv", { 
    title: "SUV", 
    image: "/images/vehicles/suv.jpg", 
    details: "Spacious and powerful, ready for your next adventure." 
  });
};

baseController.buildTruck = (req, res) => {
  res.render("truck", { 
    title: "Truck", 
    image: "/images/vehicles/truck.jpg", 
    details: "Built tough to handle any job, big or small." 
  });
};

module.exports = baseController;
