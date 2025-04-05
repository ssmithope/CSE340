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
const staticRoutes = require("./routes/static");
const baseController = require("./controllers/baseController");
const inventoryRoute = require("./routes/inventoryRoute");
const utilities = require("./utilities");
const session = require("express-session");
const pool = require("./database");
const bodyParser = require("body-parser");

/* ***********************
 * Middleware
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
app.use(staticRoutes);
app.use("/inv", inventoryRoute);
app.use("/account", require("./routes/accountRoute"));
app.get("/", utilities.handleErrors(baseController.buildHome));
app.get("/trigger-error", (req, res, next) => {
  const error = new Error("Intentional 500 Error");
  error.status = 500;
  next(error);
});
app.use((req, res, next) => next({ status: 404, message: "Page not found." }));

/* ***********************
 * Express Error Handlers
 *************************/
app.use(async (req, res) => {
  const nav = await utilities.getNav();
  res.status(404).render("errors/error", {
    title: "404 - Page Not Found",
    message: "The page you are looking for doesn't exist.",
    nav,
  });
});

app.use(async (err, req, res, next) => {
  const nav = await utilities.getNav();
  const status = err.status || 500;
  const message =
    status === 404
      ? err.message
      : "Oh no! Something broke. Maybe try a different route?";

  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  res.status(status).render("errors/error", {
    title: `${status} - Server Error`,
    message,
    nav,
  });
});

/* ***********************
 * Local Server Information
 *************************/
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

app.listen(port, () => {
  console.log(`App listening on ${host}:${port}`);
});
