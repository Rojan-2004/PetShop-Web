// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3081/api', // Backend base URL
});

// Add a request interceptor to include auth token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth Services
const authService = {
  login: async (email, password) => {
    try {
      console.log('Attempting to login with:', { email });
      const response = await api.post('/auth/login', { email, password });
      console.log('Login response:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Debug the user data
        console.log('User data stored:', response.data.user);
      }
      return response.data;
    } catch (error) {
      console.error('Login error details:', error.response?.data || error.message);
      throw error;
    }
  },
  
  register: async (userData) => {
    return await api.post('/auth/register', userData);
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  }
};

// Admin Pet Services
const petService = {
  // Admin functions
  getAllPets: async () => {
    return await api.get('/admin/pets');
  },

  createPet: async (petData) => {
    return await api.post('/admin/pets', petData);
  },

  addPet: async (petData) => {
    return await api.post('/admin/pets', petData);
  },

  updatePet: async (id, petData) => {
    return await api.put(`/admin/pets/${id}`, petData);
  },

  deletePet: async (id) => {
    return await api.delete(`/admin/pets/${id}`);
  },

  // Public pet functions (for buyers)
  getPublicPets: async () => {
    try {
      // Try the real API endpoint first
      return await api.get('/pets');
    } catch (err) {
      console.log("Falling back to mock pet data", err.message);
      // Return mock data as a fallback when the API fails
      return {
        data: [
          {
            id: 1,
            title: "Golden Retriever",
            breed: "Retriever",
            price: 599.99,
            image_url: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=400&fit=crop",
            description: "Friendly, intelligent, and devoted family dog.",
            age: 2
          },
          {
            id: 2,
            title: "Persian Cat",
            breed: "Persian",
            price: 399.99,
            image_url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=400&fit=crop",
            description: "Affectionate, quiet, and sweet cat.",
            age: 1
          },
          {
            id: 3,
            title: "Budgerigar",
            breed: "Parakeet",
            price: 49.99,
            image_url: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=300&h=400&fit=crop",
            description: "Small, playful, and social bird.",
            age: 0.5
          },
          {
            id: 4,
            title: "Holland Lop",
            breed: "Rabbit",
            price: 89.99,
            image_url: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=300&h=400&fit=crop",
            description: "Gentle, friendly, and easy to handle rabbit.",
            age: 1
          },
          {
            id: 5,
            title: "Siamese Cat",
            breed: "Siamese",
            price: 549.99,
            image_url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=400&fit=crop",
            description: "Vocal, affectionate, and intelligent cat.",
            age: 2
          }
        ]
      };
    }
  },

  getPetById: async (id) => {
    return await api.get(`/pets/${id}`);
  },
};

// Admin User Services
const userService = {
  getAllUsers: async () => {
    return await api.get('/admin/users');
  },
  
  updateUserRole: async (id, role) => {
    return await api.patch(`/admin/users/${id}`, { role });
  },
  
  updateUserInfo: async (id, userData) => {
    return await api.put(`/admin/users/${id}`, userData);
  },
  
  deleteUser: async (id) => {
    return await api.delete(`/admin/users/${id}`);
  }
};

// Order Services
const orderService = {
  // Admin functions
  getAllOrders: async () => {
    try {
      // Try the real API endpoint first
      return await api.get('/admin/orders');
    } catch (err) {
      console.warn('Using mock data for admin orders - API endpoint not available:', err.message);
      
      // Return mock data as a fallback when the API fails
      const mockAdminOrders = [
        {
          id: 1001,
          user_id: 101,
          user_name: 'John Doe',
          user_email: 'john@example.com',
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'delivered',
          total_price: 42.98,
          items: [
            { book_id: 1, book_title: 'The Great Gatsby', quantity: 1, price: 14.99 },
            { book_id: 2, book_title: 'To Kill a Mockingbird', quantity: 1, price: 12.99 },
            { book_id: 3, book_title: 'Pride and Prejudice', quantity: 1, price: 15.00 }
          ]
        },
        {
          id: 1002,
          user_id: 102,
          user_name: 'Jane Smith',
          user_email: 'jane@example.com',
          created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'shipped',
          total_price: 29.99,
          items: [
            { book_id: 4, book_title: 'The Hobbit', quantity: 1, price: 29.99 }
          ]
        },
        {
          id: 1003,
          user_id: 103,
          user_name: 'Bob Johnson',
          user_email: 'bob@example.com',
          created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          status: 'pending',
          total_price: 24.95,
          items: [
            { book_id: 5, book_title: 'The Catcher in the Rye', quantity: 1, price: 11.99 },
            { book_id: 6, book_title: '1984', quantity: 1, price: 12.96 }
          ]
        }
      ];
      
      return {
        data: mockAdminOrders,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {}
      };
    }
  },
  
  updateOrderStatus: async (id, status) => {
    return await api.patch(`/admin/orders/${id}`, { status });
  },
  
  // Buyer functions
  placeOrder: async (cartItems) => {
    return await api.post('/orders', { cartItems });
  },
  
  getUserOrders: async () => {
    try {
      // Try the real API endpoint first
      console.log('Attempting to fetch orders from API...');
      const response = await api.get('/orders/user');
      console.log('API response success:', response.data);
      return response;
    } catch (err) {
      // If API call fails, return mock data for development
      console.warn('Using mock data for orders - API endpoint not available:', err.message);
      
      // Return mock data as a fallback when the API fails
      
      // Mock order data
      const mockOrders = [
        {
          id: 1001,
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
          status: 'delivered',
          total_price: 42.98,
          items: [
            { 
              book_id: 1, 
              book_title: 'The Great Gatsby', 
              author: 'F. Scott Fitzgerald',
              quantity: 1, 
              price: 14.99,
              image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=150&h=200&fit=crop'
            },
            { 
              book_id: 2, 
              book_title: 'To Kill a Mockingbird', 
              author: 'Harper Lee',
              quantity: 1, 
              price: 12.99,
              image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=150&h=200&fit=crop'
            },
            { 
              book_id: 3, 
              book_title: 'Pride and Prejudice', 
              author: 'Jane Austen',
              quantity: 1, 
              price: 15.00,
              image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=150&h=200&fit=crop'
            }
          ],
          delivered_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
        },
        {
          id: 1002,
          created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
          status: 'shipped',
          total_price: 29.99,
          items: [
            { 
              book_id: 4, 
              book_title: 'The Hobbit', 
              author: 'J.R.R. Tolkien',
              quantity: 1, 
              price: 29.99,
              image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=150&h=200&fit=crop'
            }
          ],
          estimated_delivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days from now
        },
        {
          id: 1003,
          created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
          status: 'pending',
          total_price: 24.95,
          items: [
            { 
              book_id: 5, 
              book_title: 'The Catcher in the Rye', 
              author: 'J.D. Salinger',
              quantity: 1, 
              price: 11.99,
              image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=150&h=200&fit=crop'
            },
            { 
              book_id: 6, 
              book_title: '1984', 
              author: 'George Orwell',
              quantity: 1, 
              price: 12.96,
              image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=150&h=200&fit=crop'
            }
          ]
        }
      ];
      
      // Return mock response in the same format as the API would
      return { 
        data: mockOrders,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {}
      };
    }
  },
  
  getOrderById: async (id) => {
    return await api.get(`/orders/${id}`);
  },
  
  getLatestOrder: async () => {
    return await api.get('/orders/latest');
  }
};

// Cart Services
const cartService = {
  getCart: async () => {
    try {
      console.log('Fetching cart from API...');
      const response = await api.get('/cart');
      console.log('Cart API response:', response.data);
      return response;
    } catch (error) {
      console.error('Cart service error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  addToCart: async (petId, quantity = 1) => {
    try {
      console.log('Adding to cart:', { petId, quantity });
      const response = await api.post('/cart', { petId, quantity });
      console.log('Add to cart response:', response.data);
      return response;
    } catch (error) {
      console.error('Add to cart error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  updateCartItem: async (petId, quantity) => {
    try {
      console.log('Updating cart item:', { petId, quantity });
      const response = await api.put('/cart', { petId, quantity });
      console.log('Update cart response:', response.data);
      return response;
    } catch (error) {
      console.error('Update cart item error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  removeFromCart: async (cartItemId) => {
    try {
      console.log('Removing from cart:', cartItemId);
      const response = await api.delete(`/cart/${cartItemId}`);
      console.log('Remove from cart response:', response.data);
      return response;
    } catch (error) {
      console.error('Remove from cart error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  clearCart: async () => {
    try {
      console.log('Clearing cart...');
      const response = await api.delete('/cart');
      console.log('Clear cart response:', response.data);
      return response;
    } catch (error) {
      console.error('Clear cart error:', error.response?.data || error.message);
      throw error;
    }
  }
};

// Wishlist Services
const wishlistService = {
  getWishlist: async () => {
    try {
      console.log('Fetching wishlist from API...');
      const response = await api.get('/wishlist');
      console.log('Wishlist API response:', response.data);
      return response;
    } catch (error) {
      console.error('Wishlist service error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  addToWishlist: async (petId) => {
    try {
      console.log('Adding to wishlist:', { petId });
      const response = await api.post('/wishlist', { petId });
      console.log('Add to wishlist response:', response.data);
      return response;
    } catch (error) {
      console.error('Add to wishlist error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  removeFromWishlist: async (petId) => {
    try {
      console.log('Removing from wishlist:', petId);
      const response = await api.delete(`/wishlist/${petId}`);
      console.log('Remove from wishlist response:', response.data);
      return response;
    } catch (error) {
      console.error('Remove from wishlist error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  checkWishlist: async (petId) => {
    try {
      console.log('Checking wishlist:', petId);
      const response = await api.get(`/wishlist/check/${petId}`);
      console.log('Check wishlist response:', response.data);
      return response;
    } catch (error) {
      console.error('Check wishlist error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  clearWishlist: async () => {
    try {
      console.log('Clearing wishlist...');
      const response = await api.delete('/wishlist');
      console.log('Clear wishlist response:', response.data);
      return response;
    } catch (error) {
      console.error('Clear wishlist error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  getWishlistCount: async () => {
    try {
      console.log('Getting wishlist count...');
      const response = await api.get('/wishlist/count');
      console.log('Wishlist count response:', response.data);
      return response;
    } catch (error) {
      console.error('Wishlist count error:', error.response?.data || error.message);
      throw error;
    }
  }
};

export default api;
export { authService, petService, userService, orderService, cartService, wishlistService };
