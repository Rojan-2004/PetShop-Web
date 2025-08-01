const {
  getCartItems,
  addOrUpdateCartItem,
  removeCartItem,
  clearCart
} = require('../models/cartModel');

async function getUserCart(req, res) {
  try {
    const userId = req.user.id;
    const cart = await getCartItems(userId);
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch cart', error: err.message });
  }
}

// src/controllers/cartController.js

// ... (your existing code)

async function addToCart(req, res) {
  try {
    const userId = req.user.id;
    const { petId, quantity } = req.body;
    if (!petId || !quantity || quantity < 1) {
      return res.status(400).json({ message: 'Invalid petId or quantity' });
    }

    const item = await addOrUpdateCartItem(userId, petId, quantity);
    res.status(201).json(item);
  } catch (err) {

    console.error('Error in addToCart:', err);

    res.status(500).json({ message: 'Failed to add to cart', error: err.message });
  }
}


async function removeFromCart(req, res) {
  try {
    const { id } = req.params; // cart item id
    await removeCartItem(id);
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove from cart', error: err.message });
  }
}

module.exports = {
  getUserCart,
  addToCart,
  removeFromCart
};