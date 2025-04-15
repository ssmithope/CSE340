const utilities = require("../utilities");
const accountModel = require("../models/account-model");
const { body, validationResult } = require("express-validator");
const validate = {};

/*  **********************************
  *  Registration Data Validation Rules
  * ********************************* */
validate.registrationRules = () => {
    return [
      // First name validation
      body("account_firstname")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a valid first name."), 

      // Last name validation
      body("account_lastname")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide a valid last name."), 

      // Email validation & uniqueness check
      body("account_email")
        .trim()
        .escape()
        .notEmpty()
        .isEmail()
        .normalizeEmail()
        .withMessage("A valid email is required.")
        .custom(async (account_email) => {
            const emailExists = await accountModel.checkExistingEmail(account_email);
            if (emailExists > 0) {
                throw new Error("Email already in use. Please login or choose a different email.");
            }
        }),

      // Password strength validation
      body("account_password")
        .trim()
        .notEmpty()
        .isStrongPassword({
            minLength: 12,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })
        .withMessage("Password must be at least 12 characters long and include 1 uppercase letter, 1 number, and 1 special character."),
    ];
};

/*  **********************************
  *  Login Data Validation Rules
  * ********************************* */
validate.loginRules = () => {
  return [
      // Email validation
      body("account_email")
        .trim()
        .escape()
        .notEmpty()
        .isEmail()
        .normalizeEmail()
        .withMessage("A valid email is required."),

      // Password validation
      body("account_password")
        .trim()
        .notEmpty()
        .withMessage("Password is required."),
  ];
};

/* ******************************
 * Check data and return errors or continue to login
 * ***************************** */
validate.checkLoginData = async (req, res, next) => {
    const { account_email } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        let nav = await utilities.getNav();
        req.flash("notice", "Invalid login credentials.");
        return res.status(400).render("account/login", {
            errors: errors.array().map(err => err.msg),
            title: "Login",
            nav,
            account_email,
        });
    }
    next();
};

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkRegData = async (req, res, next) => {
    const { account_firstname, account_lastname, account_email } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        let nav = await utilities.getNav();
        req.flash("notice", "Registration failed. Please fix the errors below.");
        return res.status(400).render("account/register", {
            errors: errors.array().map(err => err.msg),
            title: "Registration",
            nav,
            account_firstname,
            account_lastname,
            account_email,
        });
    }
    next();
};

module.exports = validate;
