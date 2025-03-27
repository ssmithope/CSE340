const express = require("express");
const path = require("path");

// Import routes and controllers
const baseController = require("./controllers/baseController");
const inventoryRoutes = require("./routes/inventoryRoute");
const staticRoutes = require("./routes/static");

const app = express();

// Set the view engine to ejs
app.set("view engine", "ejs");

// Set up static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", staticRoutes);
app.use("/inventory", inventoryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(`Error at "${req.originalUrl}": ${err.message}`);
    res.status(err.status || 500).render("errors/error", {
        title: err.status || "Server Error",
        message: err.message,
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

// Export the app object for other modules
module.exports = app;
