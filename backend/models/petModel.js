const { query, run } = require('../db');

// Create a pet
async function createPet(pet) {
  const { name, species, breed, age, description, category, price, stock, image_url } = pet;
  
  // Set default species based on category if not provided
  const petSpecies = species || (category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Unknown');
  const petStock = stock || 1;
  
  const result = await run(
    `INSERT INTO pets (name, species, breed, age, description, category, price, stock, image_url)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
    [name, petSpecies, breed, age, description, category, price, petStock, image_url]
  );
  
  // Get the inserted pet
  const insertedPet = await query('SELECT * FROM pets WHERE id = $1', [result.rows[0].id]);
  return insertedPet.rows[0];
}

// Update pet
async function updatePet(id, updates) {
  const { name, species, breed, age, description, category, price, stock, image_url } = updates;
  
  // Set default species based on category if not provided
  const petSpecies = species || (category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Unknown');
  const petStock = stock || 1;
  
  await run(
    `UPDATE pets SET name=$1, species=$2, breed=$3, age=$4, description=$5,
     category=$6, price=$7, stock=$8, image_url=$9 WHERE id=$10`,
    [name, petSpecies, breed, age, description, category, price, petStock, image_url, id]
  );
  
  // Get the updated pet
  const updatedPet = await query('SELECT * FROM pets WHERE id = $1', [id]);
  return updatedPet.rows[0];
}

// Delete pet
async function deletePet(id) {
  await run(`DELETE FROM pets WHERE id = $1`, [id]);
}

// Get all pets
async function getAllPets() {
  const result = await query(`SELECT * FROM pets ORDER BY created_at DESC`);
  return result.rows;
}

// Get pet by ID
async function getPetById(id) {
  const result = await query('SELECT * FROM pets WHERE id = $1', [id]);
  return result.rows[0];
}

module.exports = {
  createPet,
  updatePet,
  deletePet,
  getAllPets,
  getPetById
};