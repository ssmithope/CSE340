/******************************************
 * This server.js file is the primary file
 * of the application. It is used to
 * control the project.
 *******************************************/

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const dotenv = require("dotenv").config();
const path = require("path");
const staticRoutes = require("./routes/static");
const baseController = require("./controllers/baseController");
const inventoryRoute = require("./routes/inventoryRoute"); // Added import
const utilities = require("./utilities"); // Added import

/* ***************************
 * App Initialization
 *****************************/
const app = express();

/* ***************************
 * View Engine and Templates
 *****************************/
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Set views directory
app.use(expressLayouts);
app.set("layout", "./layouts/layout"); // Specify layout file path

/* ***********************
 * Static Files
 *************************/
app.use("/public", express.static(path.join(__dirname, "public")));

/* ***********************
 * Routes
 *************************/
app.use(staticRoutes); // Include static routes
app.get("/", utilities.handleErrors(baseController.buildHome));
app.use("/inv", inventoryRoute); // Fixed inventoryRoute

/* ***********************
 * File Not Found Route
 *************************/
app.use(async (req, res, next) => {
  next({ status: 404, message: "Sorry, we appear to have lost that page." });
});

/* ***********************
 * Express Error Handler
 *************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav();
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  res.render("errors/error", {
    title: err.status || "Server Error",
    message: err.message,
    nav,
  });
});

/* ***********************
 * Server Information
 *************************/
const PORT = process.env.PORT || 3000; // Use environment variable PORT or fallback to 3000
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
