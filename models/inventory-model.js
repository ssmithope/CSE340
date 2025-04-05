const pool = require("../database"); // Ensure the database connection setup

/* **************************************
 * Fetch all classifications
 * ************************************ */
async function getClassifications() {
  try {
    const sql = "SELECT * FROM classification ORDER BY classification_name";
    const result = await pool.query(sql); // Run query to fetch classifications
    return result.rows; // Return the classifications as an array
  } catch (error) {
    console.error("Error fetching classifications:", error);
    throw error;
  }
}

/* **************************************
 * Fetch inventory by classification name
 * ************************************ */
async function getInventoryByClassificationName(classificationName) {
  try {
    const sql = `
      SELECT * 
      FROM inventory
      JOIN classification ON inventory.classification_id = classification.classification_id
      WHERE classification_name = $1
    `;
    const result = await pool.query(sql, [classificationName]);
    return result.rows;
  } catch (error) {
    console.error(`Error fetching inventory for classification ${classificationName}:`, error);
    throw error;
  }
}


module.exports = {
  getClassifications, // Properly define and export this function
  getInventoryByClassificationName, // Export this too
};
