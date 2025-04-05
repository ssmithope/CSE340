const invModel = require("../models/inventory-model");

invCont.getByClassificationName = async (req, res, next) => {
  const classificationName = req.params.classificationName;

  try {
    const data = await invModel.getInventoryByClassificationName(classificationName);

    if (!data || data.length === 0) {
      return res.status(404).render("errors/error", {
        title: "No Inventory Found",
        message: `No vehicles found for classification: ${classificationName}.`,
        nav: await utilities.getNav(),
      });
    }

    res.render(`${classificationName.toLowerCase()}`, {
      title: `${classificationName} Vehicles`,
      nav: await utilities.getNav(),
      data,
    });
  } catch (error) {
    next(error);
  }
};
