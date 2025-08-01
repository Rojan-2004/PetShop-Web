const wishlistModel = require('../models/wishlistModel');

const wishlistController = {
  // Add pet to wishlist
  addToWishlist: async (req, res) => {
    try {
      const userId = req.user.id;
      const { petId } = req.body;

      if (!petId) {
        return res.status(400).json({ message: 'Pet ID is required' });
      }

      const wishlistItem = await wishlistModel.addToWishlist(userId, petId);
      
      if (!wishlistItem) {
        return res.status(200).json({ message: 'Pet is already in your wishlist' });
      }

      res.status(201).json({
        message: 'Pet added to wishlist successfully',
        wishlistItem
      });
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      res.status(500).json({ message: 'Failed to add pet to wishlist' });
    }
  },

  // Get user's wishlist
  getWishlist: async (req, res) => {
    try {
      const userId = req.user.id;
      const wishlistItems = await wishlistModel.getUserWishlist(userId);

      res.status(200).json(wishlistItems);
    } catch (error) {
      console.error('Error getting wishlist:', error);
      res.status(500).json({ message: 'Failed to get wishlist' });
    }
  },

  // Remove pet from wishlist
  removeFromWishlist: async (req, res) => {
    try {
      const userId = req.user.id;
      const { petId } = req.params;

      if (!petId) {
        return res.status(400).json({ message: 'Pet ID is required' });
      }

      const removedItem = await wishlistModel.removeFromWishlist(userId, petId);
      
      if (!removedItem) {
        return res.status(404).json({ message: 'Pet not found in wishlist' });
      }

      res.status(200).json({
        message: 'Pet removed from wishlist successfully',
        removedItem
      });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      res.status(500).json({ message: 'Failed to remove pet from wishlist' });
    }
  },

  // Check if pet is in wishlist
  checkWishlist: async (req, res) => {
    try {
      const userId = req.user.id;
      const { petId } = req.params;

      if (!petId) {
        return res.status(400).json({ message: 'Pet ID is required' });
      }

      const isInWishlist = await wishlistModel.isInWishlist(userId, petId);

      res.status(200).json({ isInWishlist });
    } catch (error) {
      console.error('Error checking wishlist:', error);
      res.status(500).json({ message: 'Failed to check wishlist' });
    }
  },

  // Clear wishlist
  clearWishlist: async (req, res) => {
    try {
      const userId = req.user.id;
      const clearedItems = await wishlistModel.clearWishlist(userId);

      res.status(200).json({
        message: 'Wishlist cleared successfully',
        clearedCount: clearedItems.length
      });
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      res.status(500).json({ message: 'Failed to clear wishlist' });
    }
  },

  // Get wishlist count
  getWishlistCount: async (req, res) => {
    try {
      const userId = req.user.id;
      const count = await wishlistModel.getWishlistCount(userId);

      res.status(200).json({ count });
    } catch (error) {
      console.error('Error getting wishlist count:', error);
      res.status(500).json({ message: 'Failed to get wishlist count' });
    }
  }
};

module.exports = wishlistController;
