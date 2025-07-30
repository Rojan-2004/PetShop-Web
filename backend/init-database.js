const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { run, query } = require('./db');

dotenv.config();

async function initDatabase() {
  try {
    console.log('🔄 Initializing SQLite database...');

    // Create users table
    await run(`
      CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          role TEXT DEFAULT 'buyer',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create pets table
    await run(`
      CREATE TABLE IF NOT EXISTS pets (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          species TEXT,
          breed TEXT,
          age INTEGER,
          description TEXT,
          category TEXT,
          price REAL NOT NULL,
          stock INTEGER DEFAULT 1,
          image_url TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create cart table
    await run(`
      CREATE TABLE IF NOT EXISTS cart (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
          pet_id INTEGER REFERENCES pets(id) ON DELETE CASCADE,
          quantity INTEGER DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(user_id, pet_id)
      )
    `);

    // Create orders table
    await run(`
      CREATE TABLE IF NOT EXISTS orders (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
          total_price REAL NOT NULL,
          status TEXT DEFAULT 'pending',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create order_items table
    await run(`
      CREATE TABLE IF NOT EXISTS order_items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
          pet_id INTEGER REFERENCES pets(id),
          pet_name TEXT,
          breed TEXT,
          price REAL,
          quantity INTEGER DEFAULT 1
      )
    `);

    console.log('✅ Database tables created successfully');

    // Hash password for admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Check if admin user exists
    const existingAdmin = await query('SELECT * FROM users WHERE email = ?', ['admin@petshop.com']);
    
    if (existingAdmin.rows.length === 0) {
      // Insert default admin user
      await run(`
        INSERT INTO users (name, email, password, role) 
        VALUES (?, ?, ?, ?)
      `, ['Admin', 'admin@petshop.com', hashedPassword, 'admin']);
      console.log('✅ Admin user created');
    } else {
      console.log('ℹ️ Admin user already exists');
    }

    // Check if pets exist
    const existingPets = await query('SELECT COUNT(*) as count FROM pets');
    
    if (existingPets.rows[0].count === 0) {
      // Insert sample pets
      const samplePets = [
        ['Golden Retriever', 'Dog', 'Retriever', 2, 'Friendly and energetic dog, perfect for families', 'dog', 599.99, 1, 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=400&fit=crop'],
        ['Persian Cat', 'Cat', 'Persian', 1, 'Beautiful long-haired cat with gentle temperament', 'cat', 399.99, 1, 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=400&fit=crop'],
        ['Budgerigar', 'Bird', 'Parakeet', 1, 'Colorful and social bird, great for beginners', 'bird', 49.99, 1, 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=300&h=400&fit=crop'],
        ['Holland Lop', 'Rabbit', 'Rabbit', 1, 'Adorable rabbit with floppy ears', 'rabbit', 89.99, 1, 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=300&h=400&fit=crop'],
        ['Labrador Retriever', 'Dog', 'Retriever', 3, 'Loyal and intelligent dog, excellent family pet', 'dog', 699.99, 1, 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=300&h=400&fit=crop'],
        ['Maine Coon', 'Cat', 'Cat', 2, 'Large, gentle cat with beautiful long fur', 'cat', 599.99, 1, 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300&h=400&fit=crop']
      ];

      for (const pet of samplePets) {
        await run(`
          INSERT INTO pets (name, species, breed, age, description, category, price, stock, image_url)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, pet);
      }
      console.log('✅ Sample pets inserted');
    } else {
      console.log('ℹ️ Sample pets already exist');
    }

    console.log('🎉 Database initialization completed successfully!');

  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  initDatabase()
    .then(() => {
      console.log('Database initialization complete');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database initialization failed:', error);
      process.exit(1);
    });
}

module.exports = initDatabase;