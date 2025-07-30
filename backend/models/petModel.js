const { query, run } = require('../db');

// Create a pet
async function createPet(pet) {
  const { name, species, breed, age, description, category, price, stock, image_url } = pet;
  const result = await run(
    `INSERT INTO pets (name, species, breed, age, description, category, price, stock, image_url)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, species, breed, age, description, category, price, stock, image_url]
  );
  
  // Get the inserted pet
  const insertedPet = await query('SELECT * FROM pets WHERE id = ?', [result.lastID]);
  return insertedPet.rows[0];
}

// Update pet
async function updatePet(id, updates) {
  const { name, species, breed, age, description, category, price, stock, image_url } = updates;
  await run(
    `UPDATE pets SET name=?, species=?, breed=?, age=?, description=?,
     category=?, price=?, stock=?, image_url=? WHERE id=?`,
    [name, species, breed, age, description, category, price, stock, image_url, id]
  );
  
  // Get the updated pet
  const updatedPet = await query('SELECT * FROM pets WHERE id = ?', [id]);
  return updatedPet.rows[0];
}

// Delete pet
async function deletePet(id) {
  await run(`DELETE FROM pets WHERE id = ?`, [id]);
}

// Get all pets
async function getAllPets() {
  const result = await query(`SELECT * FROM pets ORDER BY created_at DESC`);
  return result.rows;
}

// Get pet by ID
async function getPetById(id) {
  const result = await query('SELECT * FROM pets WHERE id = ?', [id]);
  return result.rows[0];
}

module.exports = {
  createPet,
  updatePet,
  deletePet,
  getAllPets,
  getPetById
};