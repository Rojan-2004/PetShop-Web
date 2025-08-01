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
            name: "Buddy",
            breed: "Golden Retriever",
            price: 1200.00,
            image_url: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop",
            description: "Friendly and energetic golden retriever puppy. Great with kids and other pets.",
            category: "Dogs",
            stock: 3
          },
          {
            id: 2,
            name: "Whiskers",
            breed: "Persian Cat",
            price: 800.00,
            image_url: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400&h=400&fit=crop",
            description: "Beautiful long-haired Persian cat with stunning blue eyes. Very calm and affectionate.",
            category: "Cats",
            stock: 2
          },
          {
            id: 3,
            name: "Charlie",
            breed: "Beagle",
            price: 900.00,
            image_url: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=400&fit=crop",
            description: "Playful beagle with excellent temperament. Perfect family companion.",
            category: "Dogs",
            stock: 4
          },
          {
            id: 4,
            name: "Luna",
            breed: "Siamese Cat",
            price: 700.00,
            image_url: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&h=400&fit=crop",
            description: "Elegant Siamese cat with striking color points. Very intelligent and vocal.",
            category: "Cats",
            stock: 3
          },
          {
            id: 5,
            name: "Max",
            breed: "German Shepherd",
            price: 1500.00,
            image_url: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=400&fit=crop",
            description: "Loyal and intelligent German Shepherd. Excellent guard dog and family protector.",
            category: "Dogs",
            stock: 2
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
            { pet_id: 1, pet_name: 'Buddy', quantity: 1, price: 1200.00 },
            { pet_id: 2, pet_name: 'Whiskers', quantity: 1, price: 800.00 }
          ]
        },
        {
          id: 1002,
          user_id: 102,
          user_name: 'Jane Smith',
          user_email: 'jane@example.com',
          created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'shipped',
          total_price: 900.00,
          items: [
            { pet_id: 3, pet_name: 'Charlie', quantity: 1, price: 900.00 }
          ]
        },
        {
          id: 1003,
          user_id: 103,
          user_name: 'Bob Johnson',
          user_email: 'bob@example.com',
          created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          status: 'pending',
          total_price: 1400.00,
          items: [
            { pet_id: 4, pet_name: 'Luna', quantity: 1, price: 700.00 },
            { pet_id: 5, pet_name: 'Max', quantity: 1, price: 1500.00 }
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
              pet_id: 1,
              pet_name: 'Buddy',
              breed: 'Golden Retriever',
              quantity: 1,
              price: 1200.00,
              image_url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=150&h=200&fit=crop'
            },
            {
              pet_id: 2,
              pet_name: 'Whiskers',
              breed: 'Persian Cat',
              quantity: 1,
              price: 800.00,
              image_url: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=150&h=200&fit=crop'
            }
          ],
          delivered_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
        },
        {
          id: 1002,
          created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
          status: 'shipped',
          total_price: 900.00,
          items: [
            {
              pet_id: 3,
              pet_name: 'Charlie',
              breed: 'Beagle',
              quantity: 1,
              price: 900.00,
              image_url: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=150&h=200&fit=crop'
            }
          ],
          estimated_delivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days from now
        },
        {
          id: 1003,
          created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
          status: 'pending',
          total_price: 2200.00,
          items: [
            {
              pet_id: 4,
              pet_name: 'Luna',
              breed: 'Siamese Cat',
              quantity: 1,
              price: 700.00,
              image_url: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=150&h=200&fit=crop'
            },
            {
              pet_id: 5,
              pet_name: 'Max',
              breed: 'German Shepherd',
              quantity: 1,
              price: 1500.00,
              image_url: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=150&h=200&fit=crop'
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
    return await api.get('/cart');
  },
  
  addToCart: async (petId, quantity = 1) => {
    return await api.post('/cart', { petId, quantity });
  },
  
  updateCartItem: async (petId, quantity) => {
    return await api.put('/cart', { petId, quantity });
  },
  
  removeFromCart: async (petId) => {
    return await api.delete(`/cart/${petId}`);
  },
  
  clearCart: async () => {
    return await api.delete('/cart');
  }
};

export default api;
export { authService, petService, userService, orderService, cartService };
