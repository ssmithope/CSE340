const db = require("../database");

const invModel = {};

/* ***************************
 * Get Vehicle Details by ID
 * Fetch detailed information for a specific vehicle using its ID.
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
 * Fetch all inventory items that match a specific classification ID.
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
const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}



/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}


async function getVehicleByInvId(inv_id) {
  try {

    console.log(`Querying database for inv_id: ${inv_id}`);
    
    const result = await pool.query(
      `SELECT * FROM public.inventory AS i
      JOIN public.classification AS c
      ON i.classification_id = c.classification_id
      WHERE i.inv_id = $1`,
      [inv_id]
    )

    console.log("Vehicle data returned: ", result.rows)
    
    return result.rows[0]
  } catch (error) {
    console.error("getVehicleById error: " + error)
    
  }
}


// Function to insert a new classification
async function insertClassification(classification_name) {
  try {
    const sql = "INSERT INTO public.classification (classification_name) VALUES ($1)"
    console.log("Executing query:", sql, "with values:", classification_name)
    const result = await pool.query(sql, [classification_name])
    console.log("Insert result:", result)
    return result
  } catch (error) {
    console.error("insertClassification error:", error)
  }
}



const insertVehicle = async function(vehicle) {
  const { classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color } = vehicle;
  const sql = `
    INSERT INTO public.inventory 
    (classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  `;
  const result = await pool.query(sql, [classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color]);
  return result;
};




module.exports = {
  getClassifications, 
  getInventoryByClassificationId,
  getVehicleByInvId,
  insertClassification,
  insertVehicle,
};
module.exports = invModel;
