const pool = require("../database");
const bcrypt = require("bcryptjs");

async function registerAccount(account_firstname, account_lastname, account_email, account_password) {
    try {
        if (!account_password || account_password.length < 12) {
            throw new Error("Password must be at least 12 characters and contain a number, capital letter, and special character.");
        }
        
        // Ensure passwords are securely hashed
        const hashedPassword = await bcrypt.hash(account_password, 10);

        const sql = "INSERT INTO public.account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'active') RETURNING *";
        return await pool.query(sql, [account_firstname, account_lastname, account_email, hashedPassword]);
    } catch (error) {
        console.error("Registration error:", error.message);
        return { success: false, error: error.message };
    }
}

async function findByEmail(email) {
  try {
    const result = await pool.query(
      "SELECT * FROM account WHERE account_email = $1",
      [email]
    );
    
    if (!result.rows.length) {
        console.error("Email not found in database:", email);
        return null;
    }

    console.log("Retrieved user data:", result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error("Error finding user by email:", error.message);
    return null;
  }
}

async function checkExistingEmail(account_email) {
  try {
    const sql = "SELECT * FROM account WHERE account_email = $1";
    const email = await pool.query(sql, [account_email]);
    return email.rowCount;
  } catch (error) {
    console.error("Error checking existing email:", error.message);
    return { success: false, error: error.message };
  }
}

async function getAccountByEmail(account_email) {
  try {
    const result = await pool.query(
      "SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_email = $1",
      [account_email]
    );

    if (!result.rows.length) {
        console.error("Email not found in database:", account_email);
        return null;
    }

    console.log("Retrieved user data:", result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error("Database error in getAccountByEmail:", error.message);
    return null;
  }
}

async function getAllAccounts() {
  try {
    const result = await pool.query(
      "SELECT account_id, account_firstname, account_lastname, account_email, account_type FROM account ORDER BY account_id ASC"
    );
    return result.rows;
  } catch (error) {
    console.error("Error retrieving account list:", error.message);
    return null;
  }
}

async function updatePassword(accountId, hashedPassword) {
  try {
    const query = "UPDATE account SET account_password = $1 WHERE account_id = $2";
    const values = [hashedPassword, accountId];
    await pool.query(query, values);
    return { success: true };
  } catch (error) {
    console.error("Error updating password:", error.message);
    return { success: false, error: error.message };
  }
}

async function deleteAccount(accountId) {
  try {
    const sql = "DELETE FROM account WHERE account_id = $1";
    const result = await pool.query(sql, [accountId]);
    return result;
  } catch (error) {
    console.error("Failed to delete account:", error.message);
    return { success: false, error: error.message };
  }
}

module.exports = { findByEmail, registerAccount, checkExistingEmail, getAccountByEmail, getAllAccounts, updatePassword, deleteAccount };
