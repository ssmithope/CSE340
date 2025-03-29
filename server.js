const express = require("express");
const path = require("path");
require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const baseController = require("./controllers/baseController");
const errorController = require("./controllers/errorController");

const app = express();

/* *******************************************
 * Middleware Setup
 * ****************************************** */
app.use(helmet());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

/* *******************************************
 * View Engine and Templates
 * ****************************************** */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");

/* *******************************************
 * Routes
 * ****************************************** */
app.get("/", baseController.buildHome);
app.get("/custom", baseController.buildCustom);
app.get("/sedan", baseController.buildSedan);
app.get("/suv", baseController.buildSUV);
app.get("/truck", baseController.buildTruck);

/* *******************************************
 * Error Handling Middleware
 * ****************************************** */
app.use((req, res) => {
  res.status(404).render("errors/errors", { title: "404 Error", message: "Page not found" });
});

app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  res.status(err.status || 500).render("errors/errors", {
    title: `${err.status || 500} Error`,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});


process.on("SIGINT", () => {
  console.log("Shutting down server...");
  process.exit(0);
});

