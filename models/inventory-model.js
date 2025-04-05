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
    return result.rows; // Return an array of vehicles
  } catch (error) {
    console.error("Error fetching inventory by classification name:", error);
    throw error;
  }
}

module.exports = {
  getInventoryByClassificationName, // Export function
};
