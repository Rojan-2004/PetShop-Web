import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { petService } from '../services/api';

const PetCatalog = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mockPets = [
    {
      id: 1,
      name: 'Golden Retriever',
      breed: 'Retriever',
      age: 2,
      price: 599.99,
      description: 'Friendly and energetic dog, perfect for families',
      image_url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=400&fit=crop',
      category: 'dog'
    },
    {
      id: 2,
      name: 'Persian Cat',
      breed: 'Persian',
      age: 1,
      price: 399.99,
      description: 'Beautiful long-haired cat with gentle temperament',
      image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=400&fit=crop',
      category: 'cat'
    },
    {
      id: 3,
      name: 'Budgerigar',
      breed: 'Parakeet',
      age: 1,
      price: 49.99,
      description: 'Colorful and social bird, great for beginners',
      image_url: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=300&h=400&fit=crop',
      category: 'bird'
    },
    {
      id: 4,
      name: 'Holland Lop',
      breed: 'Rabbit',
      age: 1,
      price: 89.99,
      description: 'Adorable rabbit with floppy ears',
      image_url: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=300&h=400&fit=crop',
      category: 'rabbit'
    },
    {
      id: 5,
      name: 'Labrador Retriever',
      breed: 'Retriever',
      age: 3,
      price: 699.99,
      description: 'Loyal and intelligent dog, excellent family pet',
      image_url: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=300&h=400&fit=crop',
      category: 'dog'
    },
    {
      id: 6,
      name: 'Maine Coon',
      breed: 'Cat',
      age: 2,
      price: 599.99,
      description: 'Large, gentle cat with beautiful long fur',
      image_url: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300&h=400&fit=crop',
      category: 'cat'
    }
  ];

  const fetchPets = async () => {
    try {
      setLoading(true);
      const response = await petService.getPublicPets();
      setPets(response.data || mockPets);
      setError(null);
    } catch (err) {
      console.error('Error fetching pets:', err);
      setError('Failed to load pets. Showing sample pets.');
      setPets(mockPets);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const getCategoryBadgeColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'dog':
        return 'bg-blue-100 text-blue-800';
      case 'cat':
        return 'bg-purple-100 text-purple-800';
      case 'bird':
        return 'bg-green-100 text-green-800';
      case 'rabbit':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-4 text-xl text-gray-600">Loading pets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pet Catalog</h1>
          <p className="text-xl text-gray-600">Find your perfect companion from our collection</p>
        </div>

        {error && (
          <div className="bg-yellow-50 text-yellow-700 p-4 rounded-lg mb-6 border border-yellow-200">
            {error}
          </div>
        )}

        <div className="mb-6">
          <p className="text-gray-600">
            Showing {pets.length} pets available for adoption
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {pets.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No pets found</h3>
              <p className="text-gray-600">Please check back later for new arrivals</p>
            </div>
          ) : (
            pets.map((pet) => (
              <div key={pet.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img 
                    src={pet.image_url} 
                    alt={pet.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium Rs{getCategoryBadgeColor(pet.category)}`}>
                      {pet.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full">
                    <span className="text-sm font-medium text-gray-900">{pet.age}y</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {pet.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{pet.breed}</p>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{pet.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-gray-900">
                      Rs{pet.price}
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        to={`/pets/Rs{pet.id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Can't find what you're looking for?</h2>
            <p className="text-gray-600 mb-6">
              Contact us and we'll help you find the perfect pet companion for your family.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCatalog;