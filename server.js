import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import staticRoutes from "./routes/static.js";
import inventoryRoutes from "./routes/inventoryRoute.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Set view engine to EJS
app.set("view engine", "ejs");

// Serve static files (CSS, images, JS) from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Use routes
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
