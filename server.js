const express = require("express");
const path = require("path");
require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const baseController = require("./controllers/baseController");
const inventoryRoute = require("./routes/inventoryRoute");
const errorController = require("./controllers/errorController");

const app = express();

/* *******************************************
 * Middleware Setup
 * ****************************************** */
app.use(helmet()); // Secure HTTP headers
app.use(morgan("dev")); // Log HTTP requests
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

/* *******************************************
 * View Engine and Templates
 * ****************************************** */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout"); // Ensure `layout.ejs` is in the correct folder

/* *******************************************
 * Routes
 * ****************************************** */
app.get("/", baseController.buildHome); // Home page
app.use("/inv", inventoryRoute); // Inventory routes
app.get("/error", errorController.throwError); // Test error route

/* *******************************************
 * Error Handling Middleware
 * ****************************************** */
// Handle 404 errors
app.use((req, res) => {
  console.error("404 Error: Page not found"); // Log the error
  res.status(404).render("errors", { title: "404 Error", message: "Page not found" });
});

// Handle other errors
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message} | Status: ${err.status || 500}`); // Improved error logging
  const status = err.status || 500;
  res.status(status).render("errors", { title: `${status} Error`, message: err.message });
});

/* *******************************************
 * Start the Server
 * ****************************************** */
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

/* *******************************************
 * Graceful Shutdown
 * ****************************************** */
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  process.exit(0);
});
