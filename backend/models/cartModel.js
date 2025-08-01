const { query, run } = require('../db');

// Get cart items for a user (with pet details)
async function getCartItems(userId) {
  const result = await query(`
    SELECT c.id, c.quantity, p.id AS pet_id, p.name AS title, p.price, p.image_url
    FROM cart c
    JOIN pets p ON c.pet_id = p.id
    WHERE c.user_id = ?
  `, [userId]);
  return result.rows;
}

// Add or update cart item
async function addOrUpdateCartItem(userId, petId, quantity) {
  // Try updating first
  const updateResult = await query(`
    UPDATE cart SET quantity = quantity + ?
    WHERE user_id = ? AND pet_id = ?
  `, [quantity, userId, petId]);

  if (updateResult.changes === 0) {
    // Insert new if no update happened
    const insertResult = await run(`
      INSERT INTO cart (user_id, pet_id, quantity)
      VALUES (?, ?, ?)
    `, [userId, petId, quantity]);
    
    // Get the inserted item
    const insertedItem = await query('SELECT * FROM cart WHERE id = ?', [insertResult.lastID]);
    return insertedItem.rows[0];
  }
  
  // Get the updated item
  const updatedItem = await query('SELECT * FROM cart WHERE user_id = ? AND pet_id = ?', [userId, petId]);
  return updatedItem.rows[0];
}

// Update cart item quantity (set absolute quantity)
async function updateCartItemQuantity(userId, petId, quantity) {
  await query(`
    UPDATE cart SET quantity = ?
    WHERE user_id = ? AND pet_id = ?
  `, [quantity, userId, petId]);
  
  // Get the updated item
  const updatedItem = await query('SELECT * FROM cart WHERE user_id = ? AND pet_id = ?', [userId, petId]);
  return updatedItem.rows[0];
}

// Remove cart item
async function removeCartItem(cartItemId) {
  await query(`DELETE FROM cart WHERE id = ?`, [cartItemId]);
}

// Clear all cart items for user (after checkout)
async function clearCart(userId) {
  await query(`DELETE FROM cart WHERE user_id = ?`, [userId]);
}

module.exports = {
  getCartItems,
  addOrUpdateCartItem,
  updateCartItemQuantity,
  removeCartItem,
  clearCart
};
