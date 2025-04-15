const accountModel = require("../models/account-model");
const utilities = require("../utilities");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/* ****************************************
 * Deliver login view
 ****************************************** */
async function buildLogin(req, res) {
    let nav = await utilities.getNav();
    res.render("account/login", {
        title: "Login",
        nav,
        errors: null,
    });
}

/* ****************************************
 * Deliver registration view
 ****************************************** */
async function buildRegister(req, res) {
    let nav = await utilities.getNav();
    res.render("account/register", {
        title: "Register",
        nav,
        errors: null,
    });
}

/* ****************************************
 * Process Registration
 ****************************************** */
async function registerAccount(req, res) {
    let nav = await utilities.getNav();
    const { account_firstname, account_lastname, account_email, account_password } = req.body;

    try {
        // Check if email already exists
        const existingEmail = await accountModel.checkExistingEmail(account_email);
        if (existingEmail > 0) {
            req.flash("notice", "Email is already in use. Please log in.");
            return res.status(400).render("account/register", {
                title: "Register",
                nav,
                errors: [{ msg: "Email already exists." }],
            });
        }

        // Ensure passwords meet security requirements
        if (account_password.length < 12 || !/\d/.test(account_password) || !/[A-Z]/.test(account_password) || !/[!@#$%^&*]/.test(account_password)) {
            req.flash("notice", "Password must be at least 12 characters, include a capital letter, a number, and a special character.");
            return res.status(400).render("account/register", {
                title: "Register",
                nav,
                errors: [{ msg: "Weak password." }],
            });
        }

        // Hash password before storing it
        const hashedPassword = await bcrypt.hash(account_password, 10);

        // Register the new account
        const regResult = await accountModel.registerAccount(
            account_firstname,
            account_lastname,
            account_email,
            hashedPassword
        );

        if (regResult) {
            req.flash("notice", `Registration successful, ${account_firstname}. Please log in.`);
            return res.status(201).render("account/login", {
                title: "Login",
                nav,
                errors: null,
            });
        } else {
            req.flash("notice", "Registration failed. Please try again.");
            return res.status(500).render("account/register", {
                title: "Register",
                nav,
                errors: [{ msg: "Server error during registration." }],
            });
        }
    } catch (error) {
        console.error("Registration error:", error.message);
        req.flash("notice", "An error occurred while processing your registration.");
        return res.status(500).render("account/register", {
            title: "Register",
            nav,
            errors: [{ msg: "Unexpected error." }],
        });
    }
}

/* ****************************************
 * Process Login Request
 ****************************************** */
async function accountLogin(req, res) {
    let nav = await utilities.getNav();
    const { account_email, account_password } = req.body;
    
    try {
        // Fetch account details by email
        const accountData = await accountModel.getAccountByEmail(account_email);
        if (!accountData) {
            req.flash("notice", "Invalid email or password.");
            return res.status(400).render("account/login", {
                title: "Login",
                nav,
                errors: [{ msg: "Invalid credentials. Try again." }],
                account_email,
            });
        }

        // Log stored hashed password for debugging
        console.log("Stored password hash:", accountData.account_password);
        console.log("User-entered password:", account_password);

        // Validate password
        const passwordMatch = await bcrypt.compare(account_password, accountData.account_password);
        console.log("Password match result:", passwordMatch);

        if (!passwordMatch) {
            req.flash("notice", "Incorrect password. Try again.");
            return res.status(400).render("account/login", {
                title: "Login",
                nav,
                errors: [{ msg: "Wrong password." }],
                account_email,
            });
        }

        // Remove password before storing session data
        delete accountData.account_password;
        
        // Generate authentication token
        const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

        // Set JWT token in cookies
        res.cookie("jwt", accessToken, { httpOnly: true, secure: process.env.NODE_ENV !== "development", maxAge: 3600 * 1000 });

        req.flash("notice", "Login successful!");
        return res.redirect("/account/accountManagement/");
    } catch (error) {
        console.error("Login error:", error.message);
        req.flash("notice", "An error occurred. Please try again.");
        return res.status(500).render("account/login", {
            title: "Login",
            nav,
            errors: [{ msg: "Server error." }],
        });
    }
}

/* ****************************************
 * Deliver Account Management View
 ****************************************** */
async function buildAccountManagement(req, res) {
    let nav = await utilities.getNav();

    try {
        const accounts = await accountModel.getAllAccounts();
        req.flash("notice", "You are logged in.");
        res.render("account/accountManagement", {
            title: "Account Management",
            nav,
            errors: null,
            accounts,
            loggedIn: req.session.loggedin,
            account_type: req.session.account_type,
        });
    } catch (error) {
        console.error("Account management error:", error.message);
        req.flash("notice", "Error loading account information.");
        return res.status(500).render("account/accountManagement", {
            title: "Account Management",
            nav,
            errors: [{ msg: "Server error." }],
        });
    }
}

/* ****************************************
 * Reset Password
 ****************************************** */
async function resetPassword(req, res) {
    try {
        const accountId = req.params.account_id;
        const newPassword = req.body.account_password;

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await accountModel.updatePassword(accountId, hashedPassword);

        req.flash("notice", "Password has been successfully reset.");
        res.redirect("/account/accountManagement");
    } catch (error) {
        console.error("Error resetting password:", error.message);
        req.flash("notice", "Error resetting password.");
        res.status(500).render("account/resetPassword", {
            title: "Reset Password",
            errors: [{ msg: "Server error." }],
        });
    }
}

/* ****************************************
 * Delete Account
 ****************************************** */
async function deleteAccount(req, res) {
    try {
        const accountId = req.params.account_id;

        await accountModel.deleteAccount(accountId);

        req.flash("notice", "Account has been successfully deleted.");
        res.redirect("/account/accountManagement");
    } catch (error) {
        console.error("Error deleting account:", error.message);
        req.flash("notice", "Error deleting account.");
        res.status(500).render("account/accountManagement", {
            title: "Account Management",
            errors: [{ msg: "Server error." }],
        });
    }
}

/* ****************************************
 * Render Reset Password Form
 ****************************************** */
async function showResetPasswordForm(req, res) {
    try {
        const accountId = req.params.account_id;
        const account = await accountModel.getAccountByEmail(accountId);

        if (!account) {
            req.flash("notice", "Account not found.");
            return res.redirect("/account/accountManagement");
        }

        res.render("account/resetPassword", { accountId });
    } catch (error) {
        console.error("Error loading reset password form:", error.message);
        req.flash("notice", "Error loading reset password form.");
        res.redirect("/account/accountManagement");
    }
}

module.exports = {
    buildLogin,
    buildRegister,
    registerAccount,
    accountLogin,
    buildAccountManagement,
    resetPassword,
    deleteAccount,
    showResetPasswordForm,
};
