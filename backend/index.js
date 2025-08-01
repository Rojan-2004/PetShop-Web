const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { query } = require('./db');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const petRoutes = require('./routes/petRoutes');

// Optional routes (loaded with error safety)
let cartRoutes, orderRoutes, wishlistRoutes;

try {
  cartRoutes = require('./routes/cartRoutes');
} catch (err) {
  console.warn('⚠️ cartRoutes not found or has error:', err.message);
}
try {
  orderRoutes = require('./routes/orderRoutes');
} catch (err) {
  console.warn('⚠️ orderRoutes not found or has error:', err.message);
}
try {
  wishlistRoutes = require('./routes/wishlistRoutes');
} catch (err) {
  console.warn('⚠️ wishlistRoutes not found or has error:', err.message);
}

const app = express();
const PORT = process.env.PORT || 5000;

// --- ✅ Strong and Explicit CORS Configuration ---
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    process.env.FRONTEND_URL,
  ].filter(Boolean),
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
};

// --- ✅ Apply CORS to All Requests (including preflight OPTIONS) ---
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// --- ✅ Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Static image route
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/pets', petRoutes);
if (cartRoutes) app.use('/api/cart', cartRoutes);
if (orderRoutes) app.use('/api/orders', orderRoutes);
if (wishlistRoutes) app.use('/api/wishlist', wishlistRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Default route
app.get('/', (req, res) => {
  res.send('🐾 Welcome to PetShop API!');
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
async function startServer() {
  try {
    await query('SELECT 1');
    console.log('✅ Database connected successfully.');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log('📊 Admin: admin@petshop.com / admin123');
      console.log('🔓 CORS allowed:', corsOptions.origin.join(', '));
    });
  } catch (err) {
    console.error('❌ DB connection failed:', err.message);
    process.exit(1);
  }
}

startServer();
