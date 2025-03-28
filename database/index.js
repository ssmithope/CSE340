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

// Unified module exports
module.exports = {
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
};
