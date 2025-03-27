const express = require("express");
const path = require("path");
const staticRoutes = require("./routes/static");
const inventoryRoutes = require("./routes/inventoryRoute");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use("/", staticRoutes);
app.use("/inventory", inventoryRoutes);

app.use((err, req, res, next) => {
    console.error(`Error at "${req.originalUrl}": ${err.message}`);
    res.status(err.status || 500).render("errors/error", {
        title: err.status || "Server Error",
        message: err.message,
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
