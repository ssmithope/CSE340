const db = require("../database"); // Ensure this points to your database connection

// Function to fetch vehicles by classification
async function getVehiclesByClassification(classification) {
  const query = "SELECT * FROM inventory WHERE classification = $1"; // Adjust for MySQL syntax if needed
  const result = await db.query(query, [classification]);
  return result.rows;
}

// Function to fetch a single vehicle by ID
async function getVehicleById(id) {
  const query = "SELECT * FROM inventory WHERE id = $1"; // Adjust for MySQL syntax if needed
  const result = await db.query(query, [id]);
  return result.rows[0];
}

// Function to fetch all classifications
async function getClassifications() {
  const query = "SELECT DISTINCT classification_id FROM inventory"; // Replace 'classification_id' with the correct column name
  const result = await db.query(query);
  return result.rows; // Return the rows containing classification IDs
}


module.exports = { getVehiclesByClassification, getVehicleById, getClassifications };
