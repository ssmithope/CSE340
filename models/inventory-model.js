const pool = require("../database");

const invModel = {};

/* ***************************
 * Add `getClassifications` to invModel
 * ************************** */
invModel.getClassifications = async () => {
  try {
    const result = await pool.query("SELECT * FROM public.classification ORDER BY classification_name");
    console.log("Query result:", result); // Log the full result object
    console.log("Result rows:", result.rows); // Log specifically the rows
    return result.rows;
  } catch (error) {
    console.error("Error fetching classifications:", error.message);
    throw new Error("Failed to fetch classifications.");
  }
};

// Export the `invModel` object
module.exports = invModel;
