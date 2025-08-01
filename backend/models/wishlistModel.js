const db = require('../db');

const wishlistModel = {
  // Add pet to wishlist
  addToWishlist: async (userId, petId) => {
    try {
      const query = `
        INSERT INTO wishlist (user_id, pet_id) 
        VALUES ($1, $2) 
        ON CONFLICT (user_id, pet_id) DO NOTHING
        RETURNING *
      `;
      const result = await db.query(query, [userId, petId]);
      return result.rows[0];
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  },

  // Get user's wishlist with pet details
  getUserWishlist: async (userId) => {
    try {
      const query = `
        SELECT 
          w.id,
          w.user_id,
          w.pet_id,
          w.created_at,
          p.name as title,
          p.species,
          p.breed,
          p.age,
          p.description,
          p.category,
          p.price,
          p.stock,
          p.image_url
        FROM wishlist w
        JOIN pets p ON w.pet_id = p.id
        WHERE w.user_id = $1
        ORDER BY w.created_at DESC
      `;
      const result = await db.query(query, [userId]);
      return result.rows;
    } catch (error) {
      console.error('Error getting user wishlist:', error);
      throw error;
    }
  },

  // Remove pet from wishlist
  removeFromWishlist: async (userId, petId) => {
    try {
      const query = `
        DELETE FROM wishlist 
        WHERE user_id = $1 AND pet_id = $2
        RETURNING *
      `;
      const result = await db.query(query, [userId, petId]);
      return result.rows[0];
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  },

  // Check if pet is in user's wishlist
  isInWishlist: async (userId, petId) => {
    try {
      const query = `
        SELECT id FROM wishlist 
        WHERE user_id = $1 AND pet_id = $2
      `;
      const result = await db.query(query, [userId, petId]);
      return result.rows.length > 0;
    } catch (error) {
      console.error('Error checking wishlist:', error);
      throw error;
    }
  },

  // Clear user's wishlist
  clearWishlist: async (userId) => {
    try {
      const query = `
        DELETE FROM wishlist 
        WHERE user_id = $1
        RETURNING *
      `;
      const result = await db.query(query, [userId]);
      return result.rows;
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      throw error;
    }
  },

  // Get wishlist count for user
  getWishlistCount: async (userId) => {
    try {
      const query = `
        SELECT COUNT(*) as count 
        FROM wishlist 
        WHERE user_id = $1
      `;
      const result = await db.query(query, [userId]);
      return parseInt(result.rows[0].count);
    } catch (error) {
      console.error('Error getting wishlist count:', error);
      throw error;
    }
  }
};

module.exports = wishlistModel;
