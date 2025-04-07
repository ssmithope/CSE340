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
  const query = "SELECT DISTINCT classification FROM inventory"; // Query to fetch unique classifications
  const result = await db.query(query);
  return result.rows; // Return classifications
}

module.exports = { getVehiclesByClassification, getVehicleById, getClassifications };
