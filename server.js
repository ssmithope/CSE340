/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/

const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")

/* ***********************
 * Require Statements
 *************************/

const expressLayouts = require("express-ejs-layouts");
const dotenv = require("dotenv").config();
const path = require("path");
const staticRoutes = require("./routes/static");
const baseController = require("./controllers/baseController");


/* ***************************
 * App Initialization
 *****************************/
const app = express();

/* ***************************
 * View Engine and Templates
 *****************************/
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Set views directory
app.use(expressLayouts);
app.set("layout", "./layouts/layout"); // Specify layout file path

/* ***********************
 * Static Files
 *************************/
app.use('/public', express.static(path.join(__dirname, 'public')));

/* ***********************
 * Routes
 *************************/
app.use(staticRoutes); // Include static routes

// Index route
//app.get("/", (req, res) => {
//  res.render("index", { title: "Home" });
//});

app.get("/", utilities.handleErrors(baseController.buildHome))

// Inventory routes
app.use("/inv", inventoryRoute)

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message: err.message,
    nav
  })
})

/* ***********************
 * Server Information
 *************************/
const PORT = process.env.PORT || 3000; // Use environment variable PORT or fallback to 3000
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})