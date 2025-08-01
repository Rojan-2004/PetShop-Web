import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { wishlistService, cartService } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Notification from '../components/Notification';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view your wishlist.');
        setWishlistItems([]);
        return;
      }
      
      const response = await wishlistService.getWishlist();
      const wishlistData = Array.isArray(response.data) ? response.data : [];
      setWishlistItems(wishlistData);
      setError(null);
    } catch (err) {
      console.error('Error fetching wishlist:', err);
      
      if (err.response?.status === 401) {
        setError('Please login to view your wishlist.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } else if (err.response?.status === 500) {
        setError('Server error. Please check if the backend is running.');
      } else {
        setError(`Failed to load wishlist: ${err.response?.data?.message || err.message}`);
      }
      
      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeFromWishlist = async (petId) => {
    try {
      await wishlistService.removeFromWishlist(petId);
      setWishlistItems(prev => prev.filter(item => item.pet_id !== petId));
      setNotification({
        message: 'Item removed from wishlist successfully!',
        type: 'success'
      });
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      setNotification({
        message: 'Failed to remove item from wishlist. Please try again.',
        type: 'error'
      });
    }
  };

  const addToCart = async (petId) => {
    try {
      await cartService.addToCart(petId, 1);
      setNotification({
        message: 'Item added to cart successfully!',
        type: 'success'
      });
    } catch (err) {
      console.error('Error adding to cart:', err);
      setNotification({
        message: 'Failed to add item to cart. Please try again.',
        type: 'error'
      });
    }
  };

  const moveToCart = async (petId) => {
    try {
      await cartService.addToCart(petId, 1);
      await wishlistService.removeFromWishlist(petId);
      setWishlistItems(prev => prev.filter(item => item.pet_id !== petId));
      setNotification({
        message: 'Item moved to cart successfully!',
        type: 'success'
      });
    } catch (err) {
      console.error('Error moving to cart:', err);
      setNotification({
        message: 'Failed to move item to cart. Please try again.',
        type: 'error'
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-gray-800"></div>
          <p className="mt-4 text-xl text-gray-600">Loading your wishlist...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)} 
        />
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <Link 
              to="/pets" 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {wishlistItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-8">
                <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
              <p className="text-gray-500 mb-6">
                {error ? 'There was an issue loading your wishlist.' : 'Save your favorite pets to your wishlist and come back to them later.'}
              </p>
              <Link 
                to="/pets" 
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Explore Pets
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-gray-600">
                  You have {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in your wishlist
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={item.image_url || 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=400&fit=crop'}
                        alt={item.title}
                        className="w-full h-64 object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=400&fit=crop';
                        }}
                      />
                      <button
                        onClick={() => removeFromWishlist(item.pet_id)}
                        className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
                        title="Remove from wishlist"
                      >
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        </svg>
                      </button>
                    </div>
                    
                    <div className="p-6">
                      <div className="mb-4">
                        <Link 
                          to={`/pets/${item.pet_id}`}
                          className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {item.title}
                        </Link>
                        <p className="text-gray-600 text-sm mt-1">{item.breed}</p>
                        {item.age && (
                          <p className="text-gray-500 text-sm">Age: {item.age} years</p>
                        )}
                      </div>
                      
                      <div className="mb-4">
                        <span className="text-2xl font-bold text-gray-900">Rs.{item.price}</span>
                      </div>
                      
                      {item.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => moveToCart(item.pet_id)}
                          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          Move to Cart
                        </button>
                        <button
                          onClick={() => addToCart(item.pet_id)}
                          className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
