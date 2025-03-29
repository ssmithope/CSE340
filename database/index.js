const { Pool } = require("pg");
require("dotenv").config();

/* ***************
 * Connection Pool
 * *************** */
const poolConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Ensure SSL works in both development and production
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
  // Query method for executing database queries
  async query(text, params) {
    try {
      const res = await pool.query(text, params);
      if (process.env.NODE_ENV === "development") {
        console.log("executed query", { text }); // Log queries in development
      }
      return res;
    } catch (error) {
      console.error("Database query error:", error.message, error.stack); // Log errors with stack trace
      throw error;
    }
  },

  // Method to fetch classifications from the database
  async getClassifications() {
    try {
      const result = await pool.query("SELECT * FROM classifications;");
      console.log("Fetched classifications:", result.rows); // Log fetched data
      return result.rows;
    } catch (error) {
      console.error("Error fetching classifications:", error.message, error.stack);
      throw error;
    }
  },
};

// Temporary mock function for testing (optional)
const fetchDataFromDatabase = async () => {
  return [
    { id: 1, name: "Cars" },
    { id: 2, name: "Trucks" },
    { id: 3, name: "SUVs" },
  ];
};

// Replace `getClassifications` with mock data only if needed
if (process.env.USE_MOCK_DATA === "true") {
  db.getClassifications = async () => {
    try {
      const mockData = await fetchDataFromDatabase();
      console.log("Using mock classifications:", mockData);
      return mockData;
    } catch (error) {
      console.error("Error fetching mock classifications:", error.message);
      throw error;
    }
  };
}

module.exports = db;
