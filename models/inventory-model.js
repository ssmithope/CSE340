const pool = require("../database");

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
    return result.rows; // Return the vehicles in this classification
  } catch (error) {
    console.error("Error fetching inventory by classification name:", error);
    throw error;
  }
}

module.exports = {
  getClassifications, // This is already in place
  getInventoryByClassificationName, // Add this to the exported functions
};

