const db = require('../db');

// Get cart items for a user (with pet details)
async function getCartItems(userId) {
  const result = await db.query(`
    SELECT c.id, c.quantity, p.id AS pet_id, p.name AS title, p.price, p.image_url
    FROM cart c
    JOIN pets p ON c.pet_id = p.id
    WHERE c.user_id = $1
  `, [userId]);
  return result.rows;
}

// Add or update cart item
async function addOrUpdateCartItem(userId, petId, quantity) {
  // Try updating first
  const updateResult = await db.query(`
    UPDATE cart SET quantity = quantity + $3
    WHERE user_id = $1 AND pet_id = $2
    RETURNING *
  `, [userId, petId, quantity]);

  if (updateResult.rowCount === 0) {
    // Insert new if no update happened
    const insertResult = await db.query(`
      INSERT INTO cart (user_id, pet_id, quantity)
      VALUES ($1, $2, $3) RETURNING *
    `, [userId, petId, quantity]);
    return insertResult.rows[0];
  }
  return updateResult.rows[0];
}

// Update cart item quantity (set absolute quantity)
async function updateCartItemQuantity(userId, petId, quantity) {
  const updateResult = await db.query(`
    UPDATE cart SET quantity = $3
    WHERE user_id = $1 AND pet_id = $2
    RETURNING *
  `, [userId, petId, quantity]);
  
  return updateResult.rows[0];
}

// Remove cart item
async function removeCartItem(cartItemId) {
  await db.query(`DELETE FROM cart WHERE id = $1`, [cartItemId]);
}

// Clear all cart items for user (after checkout)
async function clearCart(userId) {
  await db.query(`DELETE FROM cart WHERE user_id = $1`, [userId]);
}

module.exports = {
  getCartItems,
  addOrUpdateCartItem,
  updateCartItemQuantity,
  removeCartItem,
  clearCart
};
