const { getNav } = require("../utilities/navigation");

const baseController = {};

baseController.buildHome = async function (req, res) {
  try {
    const nav = await getNav().catch(() => {
      return '<ul><li><a href="/">Home</a></li></ul>';
    });
    res.render("index", { title: "Home", nav });
  } catch (error) {
    console.error("Error building home:", error.stack);
    res.status(500).render("errors", {
      title: "500 Error",
      message: "Internal Server Error",
    });
  }
};

module.exports = baseController;
