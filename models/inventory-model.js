const pool = require("../database");

/* **************************************
 * Get all classifications
 * ************************************ */
async function getClassifications() {
  try {
    const sql = "SELECT * FROM classification ORDER BY classification_name";
    const result = await pool.query(sql);
    return result.rows; // Returns the classifications as an array
  } catch (error) {
    console.error("Error fetching classifications:", error);
    throw error;
  }
}

module.exports = {
  getClassifications, // Ensure this function is exported
};
