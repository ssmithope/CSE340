/* ***********************
 * Validation for Environment Variables
 *************************/
if (!process.env.SESSION_SECRET || !process.env.DATABASE_URL) {
  console.error("Missing essential environment variables!");
  process.exit(1); // Stop the server if variables are missing
}

/* ***********************
 * Server Configuration
 *************************/
require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const env = require("dotenv").config();
const app = express();
const static = require("./routes/static");
const baseController = require("./controllers/baseController");
const inventoryRoute = require("./routes/inventoryRoute");
const utilities = require("./utilities");
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
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    name: "sessionId",
  })
);
app.use(require("connect-flash")());
app.use((req, res, next) => {
  res.locals.messages = require("express-messages")(req, res);
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  try {
    utilities.checkJWTToken(req, res, next);
  } catch (err) {
    console.error("Error during JWT verification:", err.message);
    next(err);
  }
});

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");

/* ***********************
 * Static Files
 *************************/
app.use(express.static("public"));

/* ***********************
 * Routes
 *************************/
app.use(static);
app.get("/", utilities.handleErrors(baseController.buildHome));
app.use("/inv", inventoryRoute);
app.use("/account", require("./routes/accountRoute"));
app.use("/inv/trigger-error", inventoryRoute);

// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({ status: 404, message: "Sorry, we appear to have lost that page." });
});

/* ***********************
 * Express Error Handlers
 *************************/
app.use(async (req, res, next) => {
  try {
    let nav = await utilities.getNav();
    res.status(404).render("errors/error", {
      title: "404 - Page Not Found",
      message: "The page you are looking for doesn't exist.",
      nav,
    });
  } catch (error) {
    res.status(404).render("errors/error", {
      title: "404 - Page Not Found",
      message: "The page you are looking for doesn't exist.",
      nav: "<ul><li>Home</li></ul>", // Fallback navigation
    });
  }
});

app.use(async (err, req, res, next) => {
  try {
    let nav = await utilities.getNav();
    console.error(`Error at: "${req.originalUrl}": ${err.message}`);
    res.status(err.status || 500).render("errors/error", {
      title: "500 - Internal Server Error",
      message: "Oh no! There was a crash. Maybe try a different route?",
      nav,
    });
  } catch (error) {
    res.status(500).render("errors/error", {
      title: "500 - Internal Server Error",
      message: "Oh no! There was a crash. Maybe try a different route?",
      nav: "<ul><li>Home</li></ul>",
    });
  }
});

/* ***********************
 * Start the Server
 *************************/
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";
app.listen(port, host, () => {
  console.log(`App listening on ${host}:${port}`);
  console.log("SESSION_SECRET:", process.env.SESSION_SECRET);
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
});
