const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");
const database = require("../database");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationId;

    try {
        // Fetch inventory data
        const data = await invModel.getInventoryByClassificationId(classification_id);

        // Handle case where no data is found
        if (!data || data.length === 0) {
            console.error("No inventory data found for classification ID:", classification_id);
            const nav = await utilities.getNav();
            return res.status(404).render("inventory/classification", {
                title: "No vehicles found",
                nav,
                grid: '<p class="notice">No vehicles found for this classification.</p>',
            });
        }

        // Build grid and navigation
        const grid = await utilities.buildClassificationGrid(data);
        const nav = await utilities.getNav();

        // Render the view
        const className = data[0].classification_name;
        res.render("inventory/classification", {
            title: className + " vehicles",
            nav,
            grid,
        });
    } catch (error) {
        console.error("Error building inventory view:", error.message);
        next(error); // Pass error to error-handling middleware
    }
};

/* ***************************
 *  Render Home Page
 * ************************** */
invCont.renderHomePage = async function (req, res, next) {
    try {
        const classifications = await database.getClassifications();
        if (!classifications.length) throw new Error("No classifications found");

        const generatedNav = classifications.map(classification => classification.name);
        res.render("index", { nav: generatedNav });
    } catch (err) {
        console.error("Error rendering home page:", err.message);
        next(err); // Pass error to error-handling middleware
    }
};

// Export the controller object
module.exports = invCont;
