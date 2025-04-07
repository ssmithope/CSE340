const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Use the database URL from .env
    ssl: { rejectUnauthorized: false }, // Enable SSL for secure connections on Render
});

module.exports = pool;
