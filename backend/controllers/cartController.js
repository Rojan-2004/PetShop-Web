// controllers/cartController.js
const {
  getCartItems,
  addOrUpdateCartItem,
  updateCartItemQuantity,
  removeCartItem,
  clearCart
} = require('../models/cartModel');

async function getUserCart(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const cart = await getCartItems(userId);
    res.json(cart);
  } catch (err) {
    console.error('Cart fetch error:', err);
    res.status(500).json({ 
      message: 'Failed to fetch cart', 
      error: err.message 
    });
  }
}

async function addToCart(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { petId, quantity } = req.body;
    
    if (!petId || !quantity || quantity < 1) {
      return res.status(400).json({ 
        message: 'Invalid petId or quantity' 
      });
    }

    const item = await addOrUpdateCartItem(userId, petId, quantity);
    if (!item || !item.id) {
      throw new Error('Failed to add item to cart');
    }

    res.status(201).json({
      id: item.id,
      pet_id: item.pet_id,
      quantity: item.quantity
    });
  } catch (err) {
    console.error('Add to cart error:', err);
    res.status(500).json({ 
      message: 'Failed to add to cart', 
      error: err.message 
    });
  }
}

async function updateCartItem(req, res) {
  try {
    const userId = req.user?.id;
    const { petId } = req.params;
    const { quantity } = req.body;

    if (!userId || !petId || !quantity || quantity < 1) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    const item = await updateCartItemQuantity(userId, petId, quantity);
    res.json(item);
  } catch (err) {
    console.error('Update cart error:', err);
    res.status(500).json({ message: 'Failed to update item' });
  }
}

async function removeFromCart(req, res) {
  try {
    const cartItemId = req.params.id;
    await removeCartItem(cartItemId);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove item' });
  }
}

async function clearUserCart(req, res) {
  const userId = req.user?.id;
  try {
    await clearCart(userId);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Failed to clear cart' });
  }
}

module.exports = {
  getUserCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearUserCart
};
