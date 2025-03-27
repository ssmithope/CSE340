/* ******************************************
 * This is the application server
 * ******************************************/
const express = require("express");

const app = express();

const expressLayouts = require("express-ejs-layouts");

/* *******************************************
 * View Engine and Templates
 * ****************************************** */
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./views/layouts/layout"); // Updated path for clarity

/* ******************************************
 * Server host name and port
 * ***************************************** */
const HOST = "localhost";
const PORT = 5500;

/* ***********************
 * Log statement to confirm server operation
 * *********************** */
app.listen(PORT, () => {
  console.log(`Trial app listening on ${HOST}:${PORT}`);
});

const baseController = require("./controllers/baseController");
const inventoryRoute = require("./routes/inventoryRoute"); // Adjusted for consistent naming

// Index route
app.get("/", baseController.buildHome);

// Inventory routes
app.use("/inv", inventoryRoute);

/* *******************************************
 * Fallback Route for Undefined Paths
 * ****************************************** */
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});
