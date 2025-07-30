const { query, run } = require('../db');

// 🔍 Find user by email (used in login)
async function findUserByEmail(email) {
  const result = await query('SELECT * FROM users WHERE email = ?', [email]);
  return result.rows[0];
}

// ➕ Create a new user (used in signup)
async function createUser(name, email, hashedPassword, role) {
  const result = await run(
    `INSERT INTO users (name, email, password, role)
     VALUES (?, ?, ?, ?)`,
    [name, email, hashedPassword, role]
  );
  
  // Get the inserted user
  const insertedUser = await query('SELECT * FROM users WHERE id = ?', [result.lastID]);
  return insertedUser.rows[0];
}

// 📋 Get all users with role = 'buyer' (for admin)
async function fetchAllUsers() {
  const result = await query(
    `SELECT id, name, email, role, created_at
     FROM users
     WHERE role = 'buyer'
     ORDER BY id`
  );
  return result.rows;
}

// ✏️ Update user role (admin can promote to seller/admin)
async function changeUserRole(userId, newRole) {
  await run(
    `UPDATE users SET role = ? WHERE id = ?`,
    [newRole, userId]
  );
  
  // Get the updated user
  const updatedUser = await query(
    'SELECT id, name, email, role FROM users WHERE id = ?',
    [userId]
  );
  return updatedUser.rows[0];
}

// ❌ Delete a user
async function removeUser(userId) {
  await run(`DELETE FROM users WHERE id = ?`, [userId]);
}

// ✏️ Update user information (admin can edit name and email)
async function updateUserInfo(userId, name, email) {
  await run(
    `UPDATE users SET name = ?, email = ? WHERE id = ?`,
    [name, email, userId]
  );
  
  // Get the updated user
  const updatedUser = await query(
    'SELECT id, name, email, role FROM users WHERE id = ?',
    [userId]
  );
  return updatedUser.rows[0];
}

module.exports = {
  findUserByEmail,
  createUser,
  fetchAllUsers,
  changeUserRole,
  removeUser,
  updateUserInfo
};