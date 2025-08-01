import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cartService, orderService } from '../services/api';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);



  const fetchCart = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Please login to view your cart.');
        setCartItems([]);
        return;
      }

      const response = await cartService.getCart();
      
      setCartItems(response.data);
      setError(null);
    } catch (err) {
      handleCartError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCartError = (err) => {
    console.error('Cart error:', err);
    if (err.response?.status === 401) {
      setError('Please login to view your cart.');
      localStorage.removeItem('token');
    } else {
      setError(err.response?.data?.message || 'Failed to load cart');
    }
    setCartItems([]);
  };

  useEffect(() => { fetchCart(); }, []);

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      const token = localStorage.getItem('token');
      const item = cartItems.find(item => item.id === itemId);
      
      await cartService.updateCartItem(item.pet_id, newQuantity);
      
      setCartItems(prev => 
        prev.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to update quantity');
    }
  };

  const removeItem = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      await cartService.removeFromCart(itemId);
      setCartItems(prev => prev.filter(item => item.id !== itemId));
    } catch (err) {
      console.error('Remove error:', err);
      alert('Failed to remove item');
    }
  };

  // ... (keep your existing calculateSubtotal, calculateTax, calculateTotal functions)

  const handleCheckout = async () => {
    try {
      setCheckoutLoading(true);
      const token = localStorage.getItem('token');
      
      await orderService.placeOrder(cartItems);
      await cartService.clearCart();
      
      setCartItems([]);
      window.location.href = '/checkout/success';
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Checkout failed');
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Cart Items ({cartItems.length})
              </h2>
              
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg mb-4">
                  <img 
                    src={item.image_url} 
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-lg font-bold text-gray-900">Rs.{item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Order Summary (keep your existing code) */}
      </div>
    </div>
  );
};

export default ShoppingCart;