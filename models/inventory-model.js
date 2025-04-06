const db = require("../database"); // Ensure this points to your database connection

async function getVehiclesByClassification(classification) {
  const query = "SELECT * FROM inventory WHERE classification = $1"; // Adjust for MySQL syntax if needed
  const result = await db.query(query, [classification]);
  return result.rows;
}

async function getVehicleById(id) {
  const query = "SELECT * FROM inventory WHERE id = $1"; // Adjust for MySQL syntax if needed
  const result = await db.query(query, [id]);
  return result.rows[0];
}

module.exports = { getVehiclesByClassification, getVehicleById };
