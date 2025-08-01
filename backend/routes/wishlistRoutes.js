const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const auth = require('../middleware/auth');

// All wishlist routes require authentication
router.use(auth);

// GET /api/wishlist - Get user's wishlist
router.get('/', wishlistController.getWishlist);

// POST /api/wishlist - Add pet to wishlist
router.post('/', wishlistController.addToWishlist);

// DELETE /api/wishlist/:petId - Remove pet from wishlist
router.delete('/:petId', wishlistController.removeFromWishlist);

// GET /api/wishlist/check/:petId - Check if pet is in wishlist
router.get('/check/:petId', wishlistController.checkWishlist);

// DELETE /api/wishlist - Clear entire wishlist
router.delete('/', wishlistController.clearWishlist);

// GET /api/wishlist/count - Get wishlist count
router.get('/count', wishlistController.getWishlistCount);

module.exports = router;
