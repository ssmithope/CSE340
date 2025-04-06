/* ******************************************
 * This is the application server
 * ******************************************/
const express = require("express");
const path = require("path");
const app = express();
const inventoryRoutes = require("./routes/inventoryRoute");
const baseController = require("./controllers/baseController");

// Middleware to serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Set view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", (req, res) => baseController.buildHome(req, res)); // Home route
app.use("/inventory", inventoryRoutes); // Inventory routes

// 404 handler
app.use((req, res) => {
  res.status(404).render("errors/error", { message: "Page Not Found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).render("errors/error", { message: err.message });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
