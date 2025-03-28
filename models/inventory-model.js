const db = require("../database"); // Import the database connection pool

/**
 * Fetch all classifications from the database.
 */
async function getClassifications() {
  try {
    const result = await db.query("SELECT * FROM classification ORDER BY classification_name;");
    return result.rows; // Return the rows from the query result
  } catch (error) {
    console.error("Error fetching classifications:", error.message);
    throw error; // Rethrow the error to be handled by the caller
  }
}

/**
 * Fetch inventory based on classification ID.
 * @param {number} classificationId - The ID of the classification.
 */
async function getInventoryByClassificationId(classificationId) {
  try {
    const query = `
      SELECT * FROM inventory
      WHERE classification_id = $1
      ORDER BY inv_make, inv_model;
    `;
    const values = [classificationId];
    const result = await db.query(query, values);
    return result.rows; // Return the rows from the query result
  } catch (error) {
    console.error("Error fetching inventory by classification ID:", error.message);
    throw error; // Rethrow the error to be handled by the caller
  }
}

module.exports = { getClassifications, getInventoryByClassificationId };
