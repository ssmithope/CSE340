const pool = require("../database/connection");

async function getClassifications() {
    return await pool.query("SELECT * FROM public.classification ORDER BY classification_name");
}

async function getInventoryByClassificationId(classificationId) {
    try {
        const result = await pool.query(
            `SELECT * FROM public.inventory AS i 
             JOIN public.classification AS c 
             ON i.classification_id = c.classification_id 
             WHERE i.classification_id = $1`,
            [classificationId]
        );
        return result.rows;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function getVehicleByInvId(invId) {
    try {
        const result = await pool.query(
            `SELECT * FROM public.inventory AS i
             JOIN public.classification AS c
             ON i.classification_id = c.classification_id
             WHERE i.inv_id = $1`,
            [invId]
        );
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = {
    getClassifications,
    getInventoryByClassificationId,
    getVehicleByInvId,
};
