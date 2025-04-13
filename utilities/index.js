const invModel = require("../models/inventory-model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const utilities = {};

/* ************************
 * Constructs the nav HTML unordered list
 ************************ */
utilities.getNav = async function () {
  try {
    const data = await invModel.getClassifications();
    if (!data || !data.length) {
      console.warn("No classifications found. Returning default navigation.");
      return "<ul><li><a href='/' title='Home page'>Home</a></li></ul>";
    }

    let list = "<ul>";
    list += '<li><a href="/" title="Home page">Home</a></li>';
    data.forEach((row) => {
      list += `<li><a href="/inv/type/${row.classification_id}" title="See our inventory of ${row.classification_name} vehicles">${row.classification_name}</a></li>`;
    });
    list += "</ul>";
    return list;
  } catch (error) {
    console.error("Error in getNav:", error.message);
    return "<ul><li><a href='/' title='Home page'>Home</a></li></ul>"; // Fallback
  }
};

/* **************************************
 * Build the classification view HTML
 ************************************** */
utilities.buildClassificationGrid = function (data) {
  try {
    let grid;
    if (data.length > 0) {
      grid = '<ul id="inv-display">';
      data.forEach((vehicle) => {
        grid += `<li>
          <a href="/inv/type/${vehicle.classification_id}?vehicle=${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
            <img src="${vehicle.inv_thumbnail}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model} on CSE Motors">
          </a>
          <div class="namePrice">
            <hr>
            <h2><a href="/inv/type/${vehicle.classification_id}?vehicle=${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
            ${vehicle.inv_make} ${vehicle.inv_model}</a></h2>
            <span>$${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</span>
          </div>
        </li>`;
      });
      grid += "</ul>";
    } else {
      grid = '<p class="notice">Sorry, no matching vehicles could be found.</p>';
    }
    return grid;
  } catch (error) {
    console.error("Error in buildClassificationGrid:", error.message);
    throw new Error("Failed to build classification grid.");
  }
};

/* ****************************************
 * Build the vehicle detail view HTML
 **************************************** */
utilities.buildVehicleDetail = function (vehicle) {
  try {
    if (!vehicle) {
      return '<p class="notice">Vehicle details are not available.</p>';
    }

    let detail = `<section id="vehicle-details">`;
    detail += `<h2>${vehicle.inv_make} ${vehicle.inv_model} - ${vehicle.inv_year}</h2>`;
    detail += `<img src="${vehicle.inv_image}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">`;
    detail += `<p><strong>Price:</strong> $${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</p>`;
    detail += `<p><strong>Mileage:</strong> ${new Intl.NumberFormat("en-US").format(vehicle.inv_miles)} miles</p>`;
    detail += `<p><strong>Description:</strong> ${vehicle.inv_description}</p>`;
    detail += `<p><strong>Color:</strong> ${vehicle.inv_color}</p>`;
    detail += `</section>`;
    return detail;
  } catch (error) {
    console.error("Error in buildVehicleDetail:", error.message);
    throw new Error("Failed to build vehicle detail view.");
  }
};

/* ****************************************
 * Build the classification dropdown list
 **************************************** */
utilities.buildClassificationList = function (data) {
  try {
    if (!data || !data.length) {
      return '<p class="notice">No classifications available.</p>';
    }

    let list = '<select name="classification_id" id="classificationList" required>';
    list += '<option value="">Choose a classification</option>';
    data.forEach((classification) => {
      list += `<option value="${classification.classification_id}">${classification.classification_name}</option>`;
    });
    list += "</select>";
    return list;
  } catch (error) {
    console.error("Error in buildClassificationList:", error.message);
    throw new Error("Failed to build classification dropdown.");
  }
};

/* ****************************************
 * Middleware to check token validity
 **************************************** */
utilities.checkJWTToken = (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      jwt.verify(
        req.cookies.jwt,
        process.env.ACCESS_TOKEN_SECRET,
        function (err, accountData) {
          if (err) {
            req.flash("error", "Please log in");
            res.clearCookie("jwt");
            return res.redirect("/account/login");
          }
          res.locals.accountData = accountData;
          res.locals.loggedin = 1;
          next();
        }
      );
    } else {
      res.locals.loggedin = 0;
      next();
    }
  } catch (error) {
    console.error("Error in checkJWTToken:", error.message);
    res.locals.loggedin = 0;
    next(); // Proceed without logged-in session
  }
};

/* ****************************************
 * Middleware for Handling Errors
 **************************************** */
utilities.handleErrors = function (fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      console.error("Error caught in middleware:", error.message);
      next(error); // Pass error to the default error handler
    });
  };
};

module.exports = utilities;
