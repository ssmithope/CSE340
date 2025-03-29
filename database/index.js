const { Pool } = require("pg");
require("dotenv").config();

const poolConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
};

const pool = new Pool(poolConfig);

// Test the database connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection test failed:", err.message);
  } else {
    console.log("Database connected:", res.rows[0]);
  }
});

const db = {
  async query(text, params) {
    try {
      const res = await pool.query(text, params);
      return res;
    } catch (error) {
      console.error("Database query error:", error.message, error.stack);
      throw error;
    }
  },
  async getClassifications() {
    try {
      const result = await pool.query("SELECT * FROM classification;");
      return result.rows;
    } catch (error) {
      console.error("Error fetching classifications:", error.message, error.stack);
      throw error;
    }
  },
};

module.exports = db;
