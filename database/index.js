const { Pool } = require("pg");
require("dotenv").config();

/* ***************
 * Connection Pool
 * Determines SSL configuration based on the environment
 * *************** */
const poolConfig = {
    connectionString: process.env.DATABASE_URL,
};

// Add SSL options for development environment
if (process.env.NODE_ENV === "development") {
    poolConfig.ssl = { rejectUnauthorized: false };
}

const pool = new Pool(poolConfig);

const db = {
    // Query method for executing database queries
    async query(text, params) {
        try {
            const res = await pool.query(text, params);
            if (process.env.NODE_ENV === "development") {
                console.log("executed query", { text }); // Log queries in development
            }
            return res;
        } catch (error) {
            console.error("Database query error:", error.message); // Log errors
            throw error;
        }
    },

    // Method to fetch classifications
    async getClassifications() {
        try {
            const result = await pool.query("SELECT * FROM classifications;");
            return result.rows;
        } catch (error) {
            console.error("Error fetching classifications:", error.message);
            throw error;
        }
    }
};

module.exports = db;
