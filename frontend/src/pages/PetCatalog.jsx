import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { petService, cartService } from '../services/api';
import Notification from '../components/Notification';

const API_BASE_URL = 'http://localhost:3081';

const PetCatalog = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [categories, setCategories] = useState([]);
  const [notification, setNotification] = useState(null);

  const fetchPets = async () => {
    try {
      setLoading(true);
      // Use the public pets endpoint
      const response = await petService.getPublicPets();
      setPets(response.data);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(response.data.map(pet => pet.category))];
      setCategories(uniqueCategories);
      
      setError(null);
    } catch (err) {
      console.error('Error fetching pets:', err);
      setError('Failed to load pets. Please try again later.');
      setNotification({
        message: 'Could not load pets. Please try again.',
        type: 'error'
      });
      setPets([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const addToCart = async (petId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirect to login if not authenticated
        window.location.href = '/login';
        return;
      }
      
      await cartService.addToCart(petId, 1);
      setNotification({
        message: 'Pet added to cart successfully!',
        type: 'success'
      });
    } catch (err) {
      console.error('Error adding to cart:', err);
      setNotification({
        message: 'Failed to add pet to cart. Please try again.',
        type: 'error'
      });
    }
  };

  // Filter pets based on search term and category
  let filteredPets = pets.filter(pet => {
    const matchesSearch = 
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || pet.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Sort filtered pets
  switch (sortBy) {
    case 'newest':
      filteredPets.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      break;
    case 'price-low':
      filteredPets.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredPets.sort((a, b) => b.price - a.price);
      break;
    case 'name-az':
      filteredPets.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-za':
      filteredPets.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      break;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)} 
        />
      )}
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Pet Catalog</h1>
      </div>

      {/* Filter and Search Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search Pets</label>
            <input
              id="search"
              type="text"
              placeholder="Search by name, breed, or description..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              id="category"
              value={categoryFilter}
              onChange={handleCategoryChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              id="sort"
              value={sortBy}
              onChange={handleSortChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-az">Name: A to Z</option>
              <option value="name-za">Name: Z to A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pets Grid */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-gray-800"></div>
          <p className="mt-4 text-xl text-gray-600">Loading pets...</p>
        </div>
      ) : error ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-medium text-gray-700 mb-4">Error loading pets</h2>
          <p className="text-gray-500 mb-4">{error}</p>
          <button 
            onClick={fetchPets} 
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : filteredPets.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-medium text-gray-700 mb-4">No pets found</h2>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPets.map(pet => (
            <div key={pet.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <Link to={`/pets/${pet.id}`} className="block">
                <div className="h-64 overflow-hidden">
                  {/* FIX: Prepending the API_BASE_URL to the image path */}
                  <img 
                    src={pet.image_url ? `${API_BASE_URL}${pet.image_url}` : 'https://placehold.co/500x700?text=No+Image'} 
                    alt={pet.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-2">{pet.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{pet.breed}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-bold">${parseFloat(pet.price || 0).toFixed(2)}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${pet.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {pet.stock > 0 ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                </div>
              </Link>
              <div className="px-4 pb-4">
                <button 
                  onClick={() => addToCart(pet.id)} 
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={pet.stock <= 0}
                >
                  {pet.stock > 0 ? 'Add to Cart' : 'Not Available'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PetCatalog;
