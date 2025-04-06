const db = require('../database'); // This will import the connection from index.js

async function getVehicleById(id) {
    const query = 'SELECT * FROM inventory WHERE id = $1'; // Adjust syntax for MySQL if needed
    const result = await db.query(query, [id]); // PostgreSQL syntax
    return result.rows[0]; // Return the first row
}

module.exports = { getVehicleById };
