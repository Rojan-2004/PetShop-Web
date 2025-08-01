-- Migration script to convert book store to pet shop
-- This script renames tables and columns from books to pets

-- Step 1: Rename books table to pets
ALTER TABLE books RENAME TO pets;

-- Step 2: Rename columns in pets table
ALTER TABLE pets RENAME COLUMN title TO name;
ALTER TABLE pets RENAME COLUMN author TO breed;
-- description, category, price, stock, image_url, created_at remain the same

-- Step 3: Update cart_items table to reference pets
ALTER TABLE cart_items RENAME COLUMN book_id TO pet_id;

-- Step 4: Update order_items table to reference pets
ALTER TABLE order_items RENAME COLUMN book_id TO pet_id;

-- Step 5: Update any indexes that reference the old column names
-- Drop old indexes if they exist
DROP INDEX IF EXISTS idx_books_category;
DROP INDEX IF EXISTS idx_books_title;
DROP INDEX IF EXISTS idx_cart_items_book_id;
DROP INDEX IF EXISTS idx_order_items_book_id;

-- Create new indexes with updated names
CREATE INDEX IF NOT EXISTS idx_pets_category ON pets(category);
CREATE INDEX IF NOT EXISTS idx_pets_name ON pets(name);
CREATE INDEX IF NOT EXISTS idx_cart_items_pet_id ON cart_items(pet_id);
CREATE INDEX IF NOT EXISTS idx_order_items_pet_id ON order_items(pet_id);

-- Step 6: Update foreign key constraints
-- Drop existing foreign key constraints
ALTER TABLE cart_items DROP CONSTRAINT IF EXISTS cart_items_book_id_fkey;
ALTER TABLE order_items DROP CONSTRAINT IF EXISTS order_items_book_id_fkey;

-- Add new foreign key constraints
ALTER TABLE cart_items ADD CONSTRAINT cart_items_pet_id_fkey 
    FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE;
ALTER TABLE order_items ADD CONSTRAINT order_items_pet_id_fkey 
    FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE;

-- Step 7: Insert sample pet data (optional - remove existing book data first)
-- DELETE FROM pets; -- Uncomment this line if you want to remove existing book data

-- Sample pet data
INSERT INTO pets (name, breed, description, category, price, stock, image_url) VALUES
('Buddy', 'Golden Retriever', 'Friendly and energetic golden retriever puppy. Great with kids and other pets.', 'Dogs', 1200.00, 3, 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop'),
('Whiskers', 'Persian Cat', 'Beautiful long-haired Persian cat with stunning blue eyes. Very calm and affectionate.', 'Cats', 800.00, 2, 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400&h=400&fit=crop'),
('Charlie', 'Beagle', 'Playful beagle with excellent temperament. Perfect family companion.', 'Dogs', 900.00, 4, 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=400&fit=crop'),
('Luna', 'Siamese Cat', 'Elegant Siamese cat with striking color points. Very intelligent and vocal.', 'Cats', 700.00, 3, 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&h=400&fit=crop'),
('Max', 'German Shepherd', 'Loyal and intelligent German Shepherd. Excellent guard dog and family protector.', 'Dogs', 1500.00, 2, 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=400&fit=crop'),
('Bella', 'Maine Coon', 'Large and gentle Maine Coon cat. Known for their friendly personality.', 'Cats', 950.00, 1, 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop'),
('Rocky', 'Bulldog', 'Sturdy and gentle English Bulldog. Great apartment companion.', 'Dogs', 1800.00, 2, 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop'),
('Mittens', 'British Shorthair', 'Calm and easygoing British Shorthair with beautiful coat.', 'Cats', 850.00, 3, 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&h=400&fit=crop');