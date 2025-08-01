// models/orderModel.js
const db = require('../db');

// Create an order record
async function createOrder(userId, totalPrice) {
  const result = await db.query(
    `INSERT INTO orders (user_id, total_price)
     VALUES ($1, $2) RETURNING *`,
    [userId, totalPrice]
  );
  return result.rows[0];
}

// Add order items
async function addOrderItem(orderId, petId, quantity, price) {
  await db.query(
    `INSERT INTO order_items (order_id, pet_id, quantity, price)
     VALUES ($1, $2, $3, $4)`,
    [orderId, petId, quantity, price]
  );
}

// Get cart items with pet price
async function getCartItemsWithDetails(userId) {
  const result = await db.query(`
    SELECT ci.pet_id, ci.quantity, p.price
    FROM cart_items ci
    JOIN pets p ON ci.pet_id = p.id
    WHERE ci.user_id = $1
  `, [userId]);
  return result.rows;
}

// Clear user's cart after order
async function clearCart(userId) {
  await db.query(`DELETE FROM cart_items WHERE user_id = $1`, [userId]);
}

module.exports = {
  createOrder,
  addOrderItem,
  getCartItemsWithDetails,
  clearCart,
};