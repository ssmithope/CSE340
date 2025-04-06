const accountModel = require('../models/account-model');
const utilities = require('../utilities')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

/* ****************************************
* Deliver login view
*
* ***************************************** */

async function buildLogin(req, res, next) {
    try {
        let nav = await utilities.getNav(); // Always wrapped
        res.render("account/login", {
            title: "Login",
            nav,
            errors: null,
        });
    } catch (error) {
        console.error("Error fetching navigation for login:", error.message);
        next(error); // Forward the error for centralized handling
    }
}


/* ****************************************
* Deliver  registration view
*
* ***************************************** */

async function buildRegister(req, res, next) {
    let nav = await utilities.getNav()
        res.render("account/register", {
        title: "Register",
        nav,
        errors: null,
    })
}

/* ****************************************
 *  Process Registration
 * *************************************** */
async function registerAccount(req, res) {
    let nav;
    try {
        nav = await utilities.getNav();
    } catch (error) {
        console.error("Error fetching navigation:", error.message);
        return res.status(500).render("errors/error", { title: "Error", message: "Could not load registration page" });
    }

    const { account_firstname, account_lastname, account_email, account_password } = req.body;

    let hashedPassword;
    try {
        hashedPassword = bcrypt.hashSync(account_password, 10);
    } catch (error) {
        console.error("Error hashing password:", error.message);
        req.flash("notice", "Sorry, there was an error processing the registration.");
        return res.render("account/register", {
            title: "Registration",
            nav,
            errors: null,
        });
    }

    try {
        const regResult = await accountModel.registerAccount(
            account_firstname,
            account_lastname,
            account_email,
            hashedPassword
        );

        if (regResult) {
            req.flash("notice", `Congratulations, you are registered ${account_firstname}. Please log in.`);
            return res.status(201).render("account/login", {
                title: "Login",
                nav,
                errors: null,
            });
        } else {
            req.flash("notice", "Sorry, the registration failed.");
            return res.status(501).render("account/register", {
                title: "Registration",
                nav,
                errors: null,
            });
        }
    } catch (error) {
        console.error("Error during registration:", error.message);
        req.flash("notice", "Registration failed due to a system error.");
        return res.status(500).render("account/register", {
            title: "Registration",
            nav,
            errors: null,
        });
    }
}

/* ****************************************
 *  Process login request
 * ************************************ */
/* ****************************************
 *  Process login request
 * ************************************ */
async function accountLogin(req, res) {
    let nav = await utilities.getNav()
    const { account_email, account_password } = req.body
    console.log("Login attempt for:", account_email)
    const accountData = await accountModel.getAccountByEmail(account_email)
    if (!accountData) {
        req.flash("notice", "Please check your credentials and try again.")
        console.log("No account found for:", account_email)
        return res.status(400).render("account/login", {
            title: "Login",
            nav,
            errors: null,
            account_email,
        })
    }
    try {
        if (await bcrypt.compare(account_password, accountData.account_password)) {
            console.log("Password match for:", account_email)
            delete accountData.account_password
            const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
            if (process.env.NODE_ENV === 'development') {
                res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
            } else {
                res.cookie("jwt", accessToken, { httpOnly: true, secure: true, maxAge: 3600 * 1000 })
            }
            console.log("Redirecting to account management for:", account_email)
            return res.redirect("/account/accountManagement/")
        } else {
            req.flash("notice", "Please check your credentials and try again.")
            console.log("Password mismatch for:", account_email)
            return res.status(400).render("account/login", {
                title: "Login",
                nav,
                errors: null,
                account_email,
            })
        }
    } catch (error) {
        console.error("Error during login:", error)
        throw new Error('Access Forbidden')
    }
}

/* ****************************************
* Deliver account management view
* ***************************************** */
async function buildAccountManagement(req, res, next) {
    let nav = await utilities.getNav()

    req.flash('notice', "You are logged in.")
    res.render("account/accountManagement", {
        title: "Account Management",
        nav,
        errors: null,
        
    })
}

module.exports = { buildLogin, buildRegister, registerAccount, accountLogin, buildAccountManagement }