import express from "express"; // Import express
import path from "path"; // For working with file paths
import staticRoutes from "./routes/static.js"; // Import static routes
import inventoryRoutes from "./routes/inventoryRoute.js"; // Import inventory routes

const app = express(); // Initialize the app

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve static files (like CSS, images, etc.) from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Use routes
app.use("/", staticRoutes); // Homepage and other static pages
app.use("/inventory", inventoryRoutes); // Inventory-related pages

// Express Error Handler - Place this after all other middleware
app.use((err, req, res, next) => {
    console.error(`Error at: "${req.originalUrl}": ${err.message}`);
    res.status(err.status || 500).render("errors/error", {
        title: err.status || "Server Error",
        message: err.message,
    });
});

// Start the server
app.listen(3000, () => console.log("Server is running on port 3000"));
