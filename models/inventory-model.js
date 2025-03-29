const db = require("../database");

const invModel = {};

/* ***************************
 * Get Vehicle Details by ID
 * ************************** */
invModel.getVehicleById = async (id) => {
  try {
    const sql = "SELECT * FROM inventory WHERE inv_id = $1";
    const result = await db.query(sql, [id]);
    return result.rows[0]; // Return vehicle details
  } catch (error) {
    throw error;
  }
};

/* ***************************
 * Get Inventory by Classification ID
 * ************************** */
invModel.getInventoryByClassificationId = async (classificationId) => {
  try {
    const sql = "SELECT * FROM inventory WHERE classification_id = $1";
    const result = await db.query(sql, [classificationId]);
    return result.rows; // Return inventory list
  } catch (error) {
    throw error;
  }
};

module.exports = invModel;
