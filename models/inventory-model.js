const db = require("../database");
const pool = require("../database");

const invModel = {};

/* ***************************
 * Get Vehicle Details by ID
 * ************************** */
invModel.getVehicleById = async (id) => {
  try {
    const sql = "SELECT * FROM inventory WHERE inv_id = $1";
    const result = await db.query(sql, [id]);
    if (result.rows.length === 0) {
      throw new Error(`No vehicle found with ID ${id}`);
    }
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching vehicle by ID ${id}:`, error.message);
    throw new Error("Failed to fetch vehicle details.");
  }
};

/* ***************************
 * Get Inventory by Classification ID
 * ************************** */
invModel.getInventoryByClassificationId = async (classificationId) => {
  try {
    const sql = "SELECT * FROM inventory WHERE classification_id = $1";
    const result = await db.query(sql, [classificationId]);
    if (result.rows.length === 0) {
      throw new Error(`No inventory found for classification ID ${classificationId}`);
    }
    return result.rows;
  } catch (error) {
    console.error(`Error fetching inventory by classification ID ${classificationId}:`, error.message);
    throw new Error("Failed to fetch inventory by classification.");
  }
};

/* ***************************
 * Add `getClassifications` to invModel
 * ************************** */
invModel.getClassifications = async () => {
  try {
    const result = await pool.query("SELECT * FROM public.classification ORDER BY classification_name");
    return result.rows;
  } catch (error) {
    console.error("Error fetching classifications:", error.message);
    throw new Error("Failed to fetch classifications.");
  }
};

// Export the `invModel` object
module.exports = invModel;
