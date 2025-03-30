const invModel = require("../models/inventory-model");
const Util = {};

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  try {
    const data = await invModel.getClassifications();
    
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.error("No classifications found in the database.");
      return '<ul><li><a href="/" title="Home page">Home</a></li></ul>'; // Default navigation
    }

    let list = "<ul>";
    list += '<li><a href="/" title="Home page">Home</a></li>';
    data.forEach((row) => {
      list += `<li><a href="/inv/type/${row.classification_id}" title="See our inventory of ${row.classification_name} vehicles">${row.classification_name}</a></li>`;
    });
    list += "</ul>";
    return list;
  } catch (error) {
    console.error("Error in getNav function:", error.message);
    return '<ul><li><a href="/" title="Home page">Home</a></li></ul>'; // Fallback navigation
  }
};

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other functions in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Export the Utilities module
module.exports = Util;
