const express = require("express");
const path = require("path");
require("dotenv").config(); // Load environment variables
const helmet = require("helmet");
const morgan = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const baseController = require("./controllers/baseController");
const inventoryRoute = require("./routes/inventoryRoute");
const errorController = require("./controllers/errorController"); // Import error controller

/* *******************************************
 * Initialize Express Application
 * ****************************************** */
const app = express();

// Setting the views directory and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware or routes follow here
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index'); // Example route
});

// Example route
app.get('/', (req, res) => {
  res.render('layouts/layout', { title: 'Home Page' }); // Render layout.ejs
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

/* *******************************************
 * Use Environment Variables for Configuration
 * ****************************************** */
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
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from public folder

/* *******************************************
 * View Engine and Templates
 * ****************************************** */
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./views/layouts/layout");

/* ***********************
 * Define Routes
 * *********************** */
app.get("/", baseController.buildHome); // Render the home page
app.use("/inv", inventoryRoute); // Inventory routes
app.get("/error", errorController.throwError); // Test route to trigger errors

/* *******************************************
 * Error Handling Middleware
 * ****************************************** */
// Handle 404 errors
app.use((req, res) => {
  res.status(404).render("errors", { title: "404 Error", message: "Page not found" });
});

// Handle other errors
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
  console.log(`App listening on ${HOST}:${PORT}`);
});
