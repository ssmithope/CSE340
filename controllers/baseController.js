const { getNav } = require("../utilities/navigation");

const baseController = {};

baseController.buildHome = async function (req, res) {
  try {
    const nav = await getNav().catch(() => {
      console.error("Fallback navigation used due to error in getNav()");
      return [
        { label: "Home", link: "/" },
        { label: "Inventory", link: "/inv" },
        { label: "Contact Us", link: "/contact" },
      ];
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
