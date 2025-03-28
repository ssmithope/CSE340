const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  res.render("index", {title: "Home", nav})
}

const getNav = require("../utilities/index").getNav;

exports.buildHome = async (req, res) => {
  try {
    const navData = await getNav();
    res.render("index", { navData });
  } catch (error) {
    console.error("Error building home:", error.message);
    res.status(500).send("Internal Server Error");
  }
};



module.exports = baseController
