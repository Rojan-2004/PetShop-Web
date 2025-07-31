const { Pool } = require('pg');
require('dotenv').config();

// Create PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Petshop_db',
  password: 'admin123',
  port: 5432,
});

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error connecting to PostgreSQL database:', err.message);
  } else {
    console.log('✅ Connected to PostgreSQL database');
    release();
  }
});

// Query function for SELECT operations
const query = async (sql, params = []) => {
  try {
    const result = await pool.query(sql, params);
    return { rows: result.rows };
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

// Run function for INSERT, UPDATE, DELETE operations
const run = async (sql, params = []) => {
  try {
    const result = await pool.query(sql, params);
    return { 
      lastID: result.rows[0]?.id || null, 
      changes: result.rowCount 
    };
  } catch (error) {
    console.error('Database run error:', error);
    throw error;
  }
};

// Get a client from the pool for transactions
const getClient = async () => {
  return await pool.connect();
};

module.exports = {
  query,
  run,
  pool,
  getClient
};