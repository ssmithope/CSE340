const express = require("express");
const path = require("path");
require("dotenv").config(); // Load environment variables

const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
const expressLayouts = require("express-ejs-layouts");
const baseController = require("./controllers/baseController");
const inventoryRoute = require("./routes/inventoryRoute");
const errorController = require("./controllers/errorController"); // Import error controller

// Use environment variables for configuration
const PORT = process.env.PORT || 3000; // Default to port 3000 if not defined
const HOST = process.env.HOST || "localhost";

// Validate environment variables
if (!PORT || !HOST) {
  throw new Error("Missing required environment variables: PORT or HOST");
}

// Log server details using environment variables
console.log(`Server running at ${HOST}:${PORT}`);

/* *******************************************
 * Middleware
 * ****************************************** */
app.use(helmet()); // Secure HTTP headers
app.use(morgan("dev")); // Log HTTP requests

/* *******************************************
 * View Engine and Templates
 * ****************************************** */
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./views/layouts/layout");

/* *******************************************
 * Serve Static Files
 * ****************************************** */
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from public folder

/* ***********************
 * Define Routes
 * *********************** */
app.get("/", baseController.buildHome);
app.use("/inv", inventoryRoute);

// Test route to trigger error (optional)
app.get("/error", errorController.throwError);

/* *******************************************
 * Error Handling
 * ****************************************** */
app.use((req, res, next) => {
  res.status(404).render("errors", { title: "404 Error", message: "Page not found" });
});

app.use((err, req, res, next) => {
  console.error(err.message); // Log the error
  const status = err.status || 500;
  res.status(status).render("errors", { title: `${status} Error`, message: err.message });
});

/* *******************************************
 * Graceful Shutdown
 * ****************************************** */
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  process.exit(0);
});

/* *******************************************
 * Start the Server
 * ****************************************** */
app.listen(PORT, () => {
  console.log(`Trial app listening on ${HOST}:${PORT}`);
});
