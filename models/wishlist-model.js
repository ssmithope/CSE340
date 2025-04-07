const pool = require("../database");

// Add a vehicle to a user's wishlist
async function addToWishlist(user_id, inv_id) {
  const sql = `
    INSERT INTO wishlists (user_id, inv_id)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const result = await pool.query(sql, [user_id, inv_id]);
  return result.rows[0];
}

// Get a user's wishlist
async function getWishlistByUserId(user_id) {
  const sql = `
    SELECT inventory.*
    FROM wishlists
    JOIN inventory ON wishlists.inv_id = inventory.inv_id
    WHERE wishlists.user_id = $1;
  `;
  const result = await pool.query(sql, [user_id]);
  return result.rows;
}

module.exports = { addToWishlist, getWishlistByUserId };
