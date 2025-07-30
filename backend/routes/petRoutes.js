// routes/petRoutes.js
const express = require('express');
const router = express.Router();
const { fetchPets } = require('../controllers/petController');

// GET /api/pets - get all pets (public endpoint)
router.get('/', fetchPets);

// GET /api/pets/:id - get pet by id (public endpoint)
router.get('/:id', async (req, res) => {
  try {
    const { getAllPets } = require('../models/petModel');
    const pets = await getAllPets();
    const pet = pets.find(b => b.id === parseInt(req.params.id));
    
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch pet', error: err.message });
  }
});

module.exports = router;
