const {
  createPet,
  updatePet,
  deletePet,
  getAllPets
} = require('../models/petModel');

// Add pet
async function addPet(req, res) {
  try {
    const petData = { ...req.body };
    
    // If an image file was uploaded, use its path
    if (req.file) {
      petData.image_url = `/uploads/pets/${req.file.filename}`;
    }
    
    const newPet = await createPet(petData);
    res.status(201).json(newPet);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add pet', error: err.message });
  }
}

// Update pet
async function editPet(req, res) {
  try {
    const petId = req.params.id;
    const updateData = { ...req.body };
    
    // If an image file was uploaded, use its path
    if (req.file) {
      updateData.image_url = `/uploads/pets/${req.file.filename}`;
    }
    
    const updated = await updatePet(petId, updateData);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update pet', error: err.message });
  }
}

// Delete pet
async function removePet(req, res) {
  try {
    await deletePet(req.params.id);
    res.json({ message: 'Pet deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete pet', error: err.message });
  }
}

// Get all pets
async function fetchPets(req, res) {
  try {
    const pets = await getAllPets();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch pets', error: err.message });
  }
}

module.exports = {
  addPet,
  editPet,
  removePet,
  fetchPets
};