const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

const {
  addPet,
  editPet,
  removePet,
  fetchPets
} = require('../controllers/petController');

// 🧑‍💼 Admin-only pet routes
router.post('/pets', verifyToken, isAdmin, upload.single('image'), addPet);
router.put('/pets/:id', verifyToken, isAdmin, upload.single('image'), editPet);
router.delete('/pets/:id', verifyToken, isAdmin, removePet);
router.get('/pets', verifyToken, isAdmin, fetchPets);

const {
  getAllUsers,
  updateUserRole,
  deleteUser,
  updateUser
} = require('../controllers/userController');

router.get('/users', verifyToken, isAdmin, getAllUsers);
router.patch('/users/:id', verifyToken, isAdmin, updateUserRole);
router.put('/users/:id', verifyToken, isAdmin, updateUser);
router.delete('/users/:id', verifyToken, isAdmin, deleteUser);

// Admin order routes
const {
  getAllOrders,
  updateOrderStatus
} = require('../controllers/orderController');

router.get('/orders', verifyToken, isAdmin, getAllOrders);
router.patch('/orders/:id', verifyToken, isAdmin, updateOrderStatus);

// Add more admin routes later (orders, users, reviews, etc.)

module.exports = router;