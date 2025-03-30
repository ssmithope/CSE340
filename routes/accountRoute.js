//Needed Resources
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
const regValidate = require('../utilities/account-validation')

/* ********************************************
* Deliver Login View
* ********************************************* */
router.get("/login", utilities.handleErrors(accountController.buildLogin)) 

/* ********************************************
* Deliver Registration View
* ********************************************* */
router.get("/register", utilities.handleErrors(accountController.buildRegister))
/* ********************************************
* Register Account
* ********************************************* */
router.post("/register", 
    regValidate.registrationRules(),
    regValidate.checkRegData,    
    utilities.handleErrors(accountController.registerAccount))





module.exports = router 