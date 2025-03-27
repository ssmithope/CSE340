/* ******************************************
 * This is the application server
 * ******************************************/
const express = require("express")

const app = express()



const expressLayouts = require("express-ejs-layouts")

/* *******************************************
 * View Engine and Templates
 * ****************************************** */
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root

/* ******************************************
 * Server host name and port
 * ***************************************** */
const HOST = 'localhost'
const PORT = 5500

/* ***********************
* Log statement to confirm server operation
* *********************** */
app.listen(PORT, () => {
console.log(`trial app listening on ${HOST}:${PORT}`)
})

const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute"); // Adjust the path based on your project structure


// Index route
app.get("/", baseController.buildHome)

// Inventory routes
app.use("/inv", inventoryRoute)