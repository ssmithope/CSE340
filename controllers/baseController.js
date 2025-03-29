const { getNav } = require("../utilities/navigation");

const baseController = {};

baseController.buildHome = (req, res) => {
  res.render("index", { title: "Home" });
};

baseController.buildCustom = (req, res) => {
  res.render("custom", { title: "Custom" });
};

baseController.buildSedan = (req, res) => {
  res.render("sedan", { title: "Sedan" });
};

baseController.buildSUV = (req, res) => {
  res.render("suv", { title: "SUV" });
};

baseController.buildTruck = (req, res) => {
  res.render("truck", { title: "Truck" });
};

module.exports = baseController;


module.exports = baseController;
