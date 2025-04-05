/* ******************************************
 * This server.js file is the primary file of the
 * application. It is used to control the project.
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const env = require("dotenv").config();
const app = express();
const inventoryRoute = require("./routes/inventoryRoute");
const baseController = require("./controllers/baseController");
const utilities = require("./utilities");
const session = require("express-session");
const pool = require("./database");
const bodyParser = require("body-parser");

/* ***********************
 * Middleware Setup
 *************************/
app.use(
  session({
    store: new (require("connect-pg-simple")(session))({
      createTableIfMissing: true,
      pool,
    }),
    secret: process.env.SESSION_SECRET || "defaultSecret",
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

/* ***********************
 * View Engine and Static Files
 *************************/
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");
app.use(express.static("public"));

/* ***********************
 * Routes
 *************************/
app.use("/", require("./routes/static"));
app.get("/", utilities.handleErrors(baseController.buildHome));
app.use("/inv", inventoryRoute);
app.get("/trigger-error", (req, res, next) => {
  const error = new Error("Intentional 500 Error");
  error.status = 500;
  next(error);
});

/* ***********************
 * Error-Handling Middleware
 *************************/

// 404 Error Handler
app.use(async (req, res) => {
  const nav = await utilities.getNav();
  res.status(404).render("errors/error", {
    title: "404 - Page Not Found",
    message: "The page you are looking for doesn't exist.",
    nav,
  });
});

// 500 Error Handler
app.use(async (err, req, res, next) => {
  const nav = await utilities.getNav();
  const status = err.status || 500;
  console.error(`Error at "${req.originalUrl}":`, err.message);
  res.status(status).render("errors/error", {
    title: `${status} - Server Error`,
    message: status === 500 ? "Oh no! Something broke!" : err.message,
    nav,
  });
});

/* ***********************
 * Start Server
 *************************/
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on http://localhost:${port}`));
