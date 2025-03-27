const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  res.render("index", {title: "Home", nav})
}

exports.buildHome = (req, res) => {
  res.render("index", { layout: "./layouts/layout" });
};


module.exports = baseController
