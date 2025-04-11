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

    // Check if data.rows exists and is not empty
    if (!data || !data.length) {
      throw new Error("No classifications found to build navigation.");
    }

    let list = "<ul>";
    list += '<li><a href="/" title="Home page">Home</a></li>';
    data.forEach((row) => {
      list += "<li>";
      list += `<a href="/inv/type/${row.classification_id}" title="See our inventory of ${row.classification_name} vehicles">${row.classification_name}</a>`;
      list += "</li>";
    });
    list += "</ul>";
    return list;
  } catch (error) {
    console.error("Error in getNav:", error.message);
    throw new Error("Failed to build navigation menu.");
  }
};

/* **************************************
 * Build the classification view HTML
 ************************************** */
utilities.buildClassificationGrid = function (data) {
  let grid;
  if (data.length > 0) {
    grid = '<ul id="inv-display">';
    data.forEach((vehicle) => {
      grid += `<li>
        <a href="../../inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
          <img src="${vehicle.inv_thumbnail}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model} on CSE Motors">
        </a>
        <div class="namePrice">
          <hr>
          <h2><a href="../../inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
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
};

/* ****************************************
 * Build the classification dropdown list
 **************************************** */
utilities.buildClassificationList = function (data) {
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
};

/* ****************************************
 * Middleware to check token validity
 **************************************** */
utilities.checkJWTToken = (req, res, next) => {
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
};

/* ****************************************
 * Middleware for Handling Errors
 **************************************** */
utilities.handleErrors = function (fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = utilities;
