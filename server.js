const express = require("express");
const path = require("path");
require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const baseController = require("./controllers/baseController");
const inventoryRoute = require("./routes/inventoryRoute"); // Import the correct route file

const app = express();

/* *******************************************
 * Middleware Setup
 * ****************************************** */
app.use(helmet()); // Secure HTTP headers
app.use(morgan("dev")); // Logging
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

/* *******************************************
 * View Engine and Templates
 * ****************************************** */
app.set("views", path.join(__dirname, "views")); // Set views directory
app.set("view engine", "ejs"); // EJS as the template engine
app.use(expressLayouts); // Enable layouts
app.set("layout", "./layouts/layout"); // Default layout file

/* *******************************************
 * Routes
 * ****************************************** */
app.get("/", baseController.buildHome);
app.get("/custom", baseController.buildCustom);
app.get("/sedan", baseController.buildSedan);
app.get("/suv", baseController.buildSUV);
app.get("/truck", baseController.buildTruck);
app.use("/inventory", inventoryRoute); // Define inventory routes here

/* *******************************************
 * Error Handling Middleware
 * ****************************************** */
// Handle 404 errors
app.use((req, res) => {
  res.status(404).render("errors/errors", { 
    title: "404 Error", 
    message: "Page not found" 
  });
});

// Handle other errors
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  res.status(err.status || 500).render("errors/errors", {
    title: `${err.status || 500} Error`,
    message: "Internal Server Error",
  });
});

/* *******************************************
 * Start Server
 * ****************************************** */
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  process.exit(0);
});
