// Needed Resources
const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities");
const regValidate = require('../utilities/account-validation');

/* ********************************************
 * Deliver Login View
 ********************************************* */
router.get(
    "/login", 
    utilities.handleErrors(accountController.buildLogin)
);

/* ********************************************
 * Process the login request
 ********************************************* */
router.post(
    "/login",
    (req, res, next) => {
        console.log("Login Attempt:", req.body);
        next();
    },
    regValidate.loginRules(),
    regValidate.checkLoginData,
    utilities.handleErrors(accountController.accountLogin)
);

/* ********************************************
 * Deliver Registration View
 ********************************************* */
router.get(
    "/register", 
    utilities.handleErrors(accountController.buildRegister)
);

/* ********************************************
 * Register Account
 ********************************************* */
router.post(
    "/register",
    regValidate.registrationRules(),
    regValidate.checkRegData,    
    utilities.handleErrors(accountController.registerAccount)
);

/* ********************************************
 * Account Management View (Protected Route)
 ********************************************* */
router.get(
    "/accountManagement",
    utilities.checkJWTToken, // Ensures authentication before access
    utilities.handleErrors(accountController.buildAccountManagement)
);

/* ********************************************
 * Reset Password (Protected Route)
 ********************************************* */
router.get(
    "/reset/:account_id",
    utilities.checkJWTToken, // Prevents unauthorized reset attempts
    utilities.handleErrors(accountController.showResetPasswordForm)
);

router.post(
    "/reset/:account_id",
    utilities.checkJWTToken, // Requires authentication before changing password
    regValidate.registrationRules(), // Enforce password security rules
    utilities.handleErrors(accountController.resetPassword)
);

/* ********************************************
 * Delete Account (Protected Route)
 ********************************************* */
router.post(
    "/delete/:account_id",
    utilities.checkJWTToken, // Prevents unauthorized deletions
    utilities.handleErrors(accountController.deleteAccount)
);

module.exports = router;
