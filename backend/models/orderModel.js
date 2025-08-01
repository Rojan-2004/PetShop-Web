// models/orderModel.js
const { query, run } = require('../db');

// Create an order record
async function createOrder(userId, totalPrice) {
  const result = await run(
    `INSERT INTO orders (user_id, total_price)
     VALUES (?, ?)`,
    [userId, totalPrice]
  );
  
  // Get the created order
  const createdOrder = await query('SELECT * FROM orders WHERE id = ?', [result.lastID]);
  return createdOrder.rows[0];
}

// Add order items
async function addOrderItem(orderId, petId, petName, breed, quantity, price) {
  await run(
    `INSERT INTO order_items (order_id, pet_id, pet_name, breed, quantity, price)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [orderId, petId, petName, breed, quantity, price]
  );
}

// Get cart items with pet details
async function getCartItemsWithDetails(userId) {
  const result = await query(`
    SELECT c.pet_id, c.quantity, p.price, p.name, p.breed
    FROM cart c
    JOIN pets p ON c.pet_id = p.id
    WHERE c.user_id = ?
  `, [userId]);
  return result.rows;
}

// Clear user's cart after order
async function clearCart(userId) {
  await query(`DELETE FROM cart WHERE user_id = ?`, [userId]);
}

// Get user orders
async function getUserOrders(userId) {
  const result = await query(`
    SELECT o.*, oi.*
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    WHERE o.user_id = ?
    ORDER BY o.created_at DESC
  `, [userId]);
  return result.rows;
}

// Get all orders (for admin)
async function getAllOrders() {
  const result = await query(`
    SELECT o.*, u.name as user_name, u.email as user_email
    FROM orders o
    JOIN users u ON o.user_id = u.id
    ORDER BY o.created_at DESC
  `);
  return result.rows;
}

module.exports = {
  createOrder,
  addOrderItem,
  getCartItemsWithDetails,
  clearCart,
  getUserOrders,
  getAllOrders
};