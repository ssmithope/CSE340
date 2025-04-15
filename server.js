/* ******************************************
 * This server.js file controls the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();
const app = express();
const static = require("./routes/static");
const baseController = require("./controllers/baseController");
const inventoryRoute = require("./routes/inventoryRoute");
const accountRoute = require("./routes/accountRoute");

console.log("Utilities module loading...");
const utilities = require("./utilities");
console.log("Utilities loaded:", utilities);

const session = require("express-session");
const pool = require("./database");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

/* ***********************
 * Middleware
 *************************/
app.use(
  session({
    store: new (require("connect-pg-simple")(session))({
      createTableIfMissing: true,
      pool,
    }),
    secret: process.env.SESSION_SECRET || "secret",
    resave: false, // Prevents unnecessary session saving
    saveUninitialized: false, // Ensures uninitialized sessions are not saved
    name: "sessionId",
  })
);

// Express Messages Middleware
app.use(require("connect-flash")());

app.use((req, res, next) => {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(cookieParser());

// Improved Login Authentication Handling
app.use((req, res, next) => {
  console.log("JWT Middleware Triggered:", req.cookies.jwt || "No JWT found");
  utilities.checkJWTToken(req, res, next);
});

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");

/* ***********************
 * Serve Static Files
 *************************/
app.use(express.static("public"));

/* ***********************
 * Routes
 *************************/
app.use(static);
// Index route
app.get("/", utilities.handleErrors(baseController.buildHome));

// Inventory & Account routes
app.use("/inv", inventoryRoute);
app.use("/account", accountRoute);

// Trigger error route (for testing)
app.use("/inv/trigger-error", inventoryRoute);

/* ***********************
 * File Not Found Route
 *************************/
app.use((req, res, next) => {
  console.warn(`404 Error: Page not found - ${req.originalUrl}`);
  next({ status: 404, message: "Sorry, we appear to have lost that page." });
});

/* ***********************
 * Express Error Handler for 404
 *************************/
app.use(async (req, res, next) => {
  try {
    const nav = await utilities.getNav();
    res.status(404).render("errors/error", {
      title: "404 - Page Not Found",
      message: "The page you are looking for doesn't exist.",
      nav,
    });
  } catch (error) {
    console.error("Navigation error in 404 handler:", error.message);
    res.status(500).render("errors/error", {
      title: "500 - Server Error",
      message: "There was an issue loading the navigation menu.",
    });
  }
});

/* ***********************
 * Express Error Handler for 500
 *************************/
app.use(async (err, req, res, next) => {
  try {
    const nav = await utilities.getNav();
    console.error(`Error at: "${req.originalUrl}":`, err);
    res.status(err.status || 500).render("errors/error", {
      title: `${err.status || 500} - Server Error`,
      message: err.message || "An unexpected server error occurred.",
      nav,
    });
  } catch (error) {
    console.error("Navigation error in 500 handler:", error.message);
    res.status(500).render("errors/error", {
      title: "500 - Server Error",
      message: "There was an issue loading the navigation menu.",
    });
  }
});

/* ***********************
 * Local Server Information
 *************************/
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

app.listen(port, () => {
  console.log(`🚀 Server running on ${host}:${port}`);
});
