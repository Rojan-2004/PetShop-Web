const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const {
  getUserCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearUserCart
} = require('../controllers/cartController');

router.get('/', verifyToken, getUserCart);
router.post('/', verifyToken, addToCart);
router.put('/', verifyToken, updateCartItem);
router.delete('/:id', verifyToken, removeFromCart);
router.delete('/', verifyToken, clearUserCart);

module.exports = router;