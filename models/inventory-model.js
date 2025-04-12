const pool = require("../database");

/* *****************************
 * Get all classification data
 ***************************** */
async function getClassifications() {
  try {
    const sql = "SELECT * FROM public.classification ORDER BY classification_name";
    const result = await pool.query(sql);
    if (!result.rows.length) {
      throw new Error("No classifications found in the database.");
    }
    return result.rows;
  } catch (error) {
    console.error("Error fetching classifications:", error.message);
    throw error; // Rethrow error for handling in the controller
  }
}

/* **************************************************************************
 * Get all inventory items and classification_name by classification_id
 *************************************************************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const sql = `
      SELECT * 
      FROM public.inventory AS i
      JOIN public.classification AS c
      ON i.classification_id = c.classification_id
      WHERE i.classification_id = $1;
    `;
    const result = await pool.query(sql, [classification_id]);
    if (!result.rows.length) {
      throw new Error(`No inventory items found for classification ID ${classification_id}.`);
    }
    return result.rows;
  } catch (error) {
    console.error(`Error fetching inventory for classification ${classification_id}:`, error.message);
    throw error;
  }
}

/* *****************************
 * Get vehicle details by inv_id
 ***************************** */
async function getVehicleByInvId(inv_id) {
  try {
    const sql = `
      SELECT * 
      FROM public.inventory AS i
      JOIN public.classification AS c
      ON i.classification_id = c.classification_id
      WHERE i.inv_id = $1;
    `;
    const result = await pool.query(sql, [inv_id]);
    if (!result.rows.length) {
      throw new Error(`No vehicle found for inventory ID ${inv_id}.`);
    }
    return result.rows[0]; // Return single vehicle details
  } catch (error) {
    console.error(`Error fetching vehicle details for inv_id ${inv_id}:`, error.message);
    throw error;
  }
}

/* *****************************
 * Insert a new classification
 ***************************** */
async function insertClassification(classification_name) {
  try {
    const sql = "INSERT INTO public.classification (classification_name) VALUES ($1) RETURNING classification_id";
    const result = await pool.query(sql, [classification_name]);
    return result.rows[0]; // Return inserted classification ID
  } catch (error) {
    console.error(`Error inserting classification "${classification_name}":`, error.message);
    throw error;
  }
}

/* *****************************
 * Insert a new vehicle
 ***************************** */
async function insertVehicle(vehicle) {
  try {
    const {
      classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
    } = vehicle;

    const sql = `
      INSERT INTO public.inventory 
      (classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING inv_id; -- Return the ID of the newly inserted vehicle
    `;
    const result = await pool.query(sql, [
      classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
    ]);
    return result.rows[0]; // Return inserted vehicle ID
  } catch (error) {
    console.error(`Error inserting vehicle "${vehicle.inv_make} ${vehicle.inv_model}":`, error.message);
    throw error;
  }
}

/* *****************************
 * Fetch vehicles by classification ID
 ***************************** */
async function getVehiclesByClassification(classificationId) {
  try {
    const sql = "SELECT * FROM public.inventory WHERE classification_id = $1";
    const result = await pool.query(sql, [classificationId]);
    if (!result.rows.length) {
      throw new Error(`No vehicles found for classification ID ${classificationId}.`);
    }
    return result.rows;
  } catch (error) {
    console.error(`Error fetching vehicles for classification ${classificationId}:`, error.message);
    throw error;
  }
}

module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getVehicleByInvId,
  insertClassification,
  insertVehicle,
  getVehiclesByClassification,
};
