const invController = {};

/* ***************************
 * Build inventory by classification view
 * ************************** */
invController.buildByClassificationId = async function (req, res, next) {
  try {
    const classification_id = parseInt(req.params.classificationId, 10); // Ensure classificationId is an integer
    if (isNaN(classification_id)) {
      return res.status(400).render("./errors/error", {
        title: "Invalid Classification",
        message: "The provided classification ID is invalid.",
      });
    }

    const data = await invModel.getInventoryByClassificationId(classification_id);
    const nav = await utilities.getNav();

    if (!data.length) {
      return res.status(404).render("./errors/error", {
        title: "Classification Not Found",
        message: "No vehicles found for this classification.",
        nav,
      });
    }

    const grid = await utilities.buildClassificationGrid(data);
    const className = data[0].classification_name;

    res.render("./inventory/classification", {
      title: `${className} Vehicles`,
      nav,
      grid,
    });
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
};

/* ***************************
 * Build management view
 * ************************** */
invController.buildManagementView = async function (req, res, next) {
  try {
    const nav = await utilities.getNav();
    const classifications = await invModel.getClassifications();
    const classificationSelect = await utilities.buildClassificationList(classifications.rows);

    res.render("inventory/management", {
      title: "Vehicle Management",
      nav,
      classificationSelect,
      flash: req.flash("info"), // Display flash messages
    });
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
};

/* ***************************
 * Show add classification view
 * ************************** */
invController.showAddClassification = async function (req, res, next) {
  const nav = await utilities.getNav();
  res.render("inventory/addClassification", {
    title: "Add Vehicle Classification",
    nav,
    flash: req.flash("info"), // Display flash messages
    errors: null,
  });
};

/* ***************************
 * Add classification process
 * ************************** */
invController.addClassification = async function (req, res, next) {
  const nav = await utilities.getNav();
  const { classification_name } = req.body;
  const errors = [];

  // Server-side validation
  const regex = /^[a-zA-Z0-9\s-]+$/;
  if (!regex.test(classification_name)) {
    errors.push({ msg: "Classification name cannot contain special characters." });
  }

  if (errors.length > 0) {
    return res.render("inventory/addClassification", {
      title: "Add Vehicle Classification",
      nav,
      errors,
      flash: null,
    });
  }

  try {
    await invModel.insertClassification(classification_name);
    req.flash("info", "Classification added successfully.");
    res.redirect("/inv");
  } catch (error) {
    errors.push({ msg: "Error adding classification. Please try again later." });
    res.render("inventory/addClassification", {
      title: "Add Vehicle Classification",
      nav,
      errors,
      flash: null,
    });
  }
};

/* ***************************
 * Show add inventory view
 * ************************** */
invController.showAddInventory = async function (req, res, next) {
  try {
    const nav = await utilities.getNav();
    const classifications = await invModel.getClassifications();
    const classificationSelect = await utilities.buildClassificationList();

    res.render("inventory/addInventory", {
      title: "Add New Vehicle",
      nav,
      flash: req.flash("info"),
      classificationSelect,
      errors: null,
    });
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
};

/* ***************************
 * Add inventory process
 * ************************** */
invController.addInventory = async function (req, res, next) {
  const { classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color } = req.body;
  const nav = await utilities.getNav();
  const errors = [];

  // Server-side validation
  if (!classification_id || !inv_make || !inv_model || !inv_year || !inv_description || !inv_image || !inv_thumbnail || !inv_price || !inv_miles || !inv_color) {
    errors.push({ msg: "All fields are required." });
  }

  if (errors.length > 0) {
    const classifications = await invModel.getClassifications();
    const classificationSelect = await utilities.buildClassificationList(classification_id);

    return res.render("inventory/addInventory", {
      title: "Add New Vehicle",
      nav,
      flash: null,
      errors,
      classificationSelect,
    });
  }

  try {
    await invModel.insertVehicle({
      classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
    });
    req.flash("info", "Vehicle added successfully.");
    res.redirect("/inv");
  } catch (error) {
    errors.push({ msg: "Error adding vehicle. Please try again later." });
    const classifications = await invModel.getClassifications();
    const classificationSelect = await utilities.buildClassificationList(classification_id);

    res.render("inventory/addInventory", {
      title: "Add New Vehicle",
      nav,
      flash: null,
      errors,
      classificationSelect,
    });
  }
};

/* ***************************
 * Return inventory by classification as JSON
 * ************************** */
invController.getInventoryJSON = async function (req, res, next) {
  const classification_id = parseInt(req.params.classification_id, 10);
  if (isNaN(classification_id)) {
    return res.status(400).json({ error: "Invalid classification ID." });
  }

  try {
    const invData = await invModel.getInventoryByClassificationId(classification_id);
    if (invData.length > 0) {
      return res.json(invData);
    } else {
      return res.status(404).json({ error: "No inventory found for this classification." });
    }
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
};

module.exports = invController;
