/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const dotenv = require("dotenv").config();
const path = require("path");
const staticRoutes = require("./routes/static");

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
app.use('/public', express.static(path.join(__dirname, 'public')));

/* ***********************
 * Routes
 *************************/
app.use(staticRoutes); // Include static routes

// Index route
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

/* ***********************
 * Server Information
 *************************/
const PORT = process.env.PORT || 3000; // Use environment variable PORT or fallback to 3000
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
