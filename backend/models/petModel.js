const db = require('../db');

// Create a pet
async function createPet(pet) {
  const { name, breed, description, category, price, stock, image_url } = pet;
  const result = await db.query(
    `INSERT INTO pets (name, breed, description, category, price, stock, image_url)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [name, breed, description, category, price, stock, image_url]
  );
  return result.rows[0];
}

// Update pet
async function updatePet(id, updates) {
  const { name, breed, description, category, price, stock, image_url } = updates;
  const result = await db.query(
    `UPDATE pets SET name=$1, breed=$2, description=$3, category=$4,
     price=$5, stock=$6, image_url=$7 WHERE id=$8 RETURNING *`,
    [name, breed, description, category, price, stock, image_url, id]
  );
  return result.rows[0];
}

// Delete pet
async function deletePet(id) {
  await db.query(`DELETE FROM pets WHERE id = $1`, [id]);
}

// Get all pets
async function getAllPets() {
  const result = await db.query(`SELECT * FROM pets ORDER BY created_at DESC`);
  return result.rows;
}

module.exports = {
  createPet,
  updatePet,
  deletePet,
  getAllPets
};