/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/

//const express = require("express")
//const router = new express.Router() 
//const invController = require("../controllers/invControllers");

/* ***********************
 * Require Statements
 *************************/
//const express = require("express");
//const expressLayouts = require("express-ejs-layouts");
//const dotenv = require("dotenv").config();
//const path = require("path");
//const staticRoutes = require("./routes/static");
//const baseController = require("./controllers/baseController");


/* ***************************
 * App Initialization
 *****************************/
//const app = express();

/* ***************************
 * View Engine and Templates
 *****************************/
//app.set("view engine", "ejs");
//app.set("views", path.join(__dirname, "views")); // Set views directory
//app.use(expressLayouts);
//app.set("layout", "./layouts/layout"); // Specify layout file path

/* ***********************
 * Static Files
 *************************/
//app.use('/public', express.static(path.join(__dirname, 'public')));

/* ***********************
 * Routes
 *************************/
//app.use(staticRoutes); // Include static routes

// Index route
//app.get("/", (req, res) => {
//  res.render("index", { title: "Home" });
//});

//app.get("/", utilities.handleErrors(baseController.buildHome))

// Inventory routes
//app.use("/inv", inventoryRoute)

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
//app.use(async (err, req, res, next) => {
//  let nav = await utilities.getNav()
//  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
//  res.render("errors/error", {
//    title: err.status || 'Server Error',
//    message: err.message,
//    nav
//  })
//})

/* ***********************
 * Server Information
 *************************/
//const PORT = process.env.PORT || 3000; // Use environment variable PORT or fallback to 3000
//app.listen(PORT, () => {
//  console.log(`App listening on port ${PORT}`);
//});

// File Not Found Route - must be last route in list
//app.use(async (req, res, next) => {
//  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
//})


import express from "express";
import staticRoutes from "./routes/static.js"; // Import your static routes (for homepage)
import inventoryRoutes from "./routes/inventoryRoute.js"; // Import inventory-related routes
import path from "path";
const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve static files (like CSS and images) from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Use routes
app.use("/", staticRoutes); // Routes for the homepage and other static pages
app.use("/inventory", inventoryRoutes); // Inventory routes

// Express Error Handler - Place this after all other middleware
app.use(async (err, req, res, next) => {
    console.error(`Error at: "${req.originalUrl}": ${err.message}`);
    res.status(err.status || 500).render("errors/error", {
        title: err.status || "Server Error",
        message: err.message,
    });
});

// Start the server
app.listen(3000, () => console.log("Server is running on port 3000"));
