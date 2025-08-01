import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { petService, cartService } from '../services/api';

const PetDetail = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        setLoading(true);
        // This endpoint should be public - no token required
        const response = await petService.getPetById(id);
        setPet(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching pet details:', err);
        setError('Failed to load pet details. Please try again later.');
        
        // Mock data for demonstration
        setPet({
          id: parseInt(id),
          name: 'Buddy',
          breed: 'Golden Retriever',
          description: 'Buddy is a friendly and energetic Golden Retriever puppy. He loves playing fetch, going on walks, and spending time with his family. He\'s great with kids and other pets, making him the perfect addition to any loving home.',
          category: 'Dogs',
          price: 1200.00,
          stock: 3,
          image_url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&h=700&fit=crop',
          created_at: '2023-01-15T00:00:00Z',
          age: '8 weeks',
          size: 'Medium',
          color: 'Golden',
          gender: 'Male',
          vaccinated: true
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= (pet?.stock || 0)) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    if (quantity < (pet?.stock || 0)) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirect to login if not authenticated
        window.location.href = '/login';
        return;
      }
      
      await cartService.addToCart(pet.id, quantity);
      
      alert('Pet added to cart successfully!');
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add pet to cart. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-gray-800"></div>
        <p className="mt-4 text-xl text-gray-600">Loading pet details...</p>
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-red-50 text-red-700 p-6 rounded-lg border border-red-200 text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error || 'Pet not found'}</p>
          <Link to="/pets" className="mt-4 inline-block px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900">
            Back to Pets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/pets" className="text-gray-600 hover:text-gray-900">
          &larr; Back to Pets
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Left Column - Pet Image */}
          <div className="md:w-1/3 p-6 flex justify-center">
            <img
              src={pet.image_url || 'https://via.placeholder.com/500x700?text=No+Image'}
              alt={pet.name}
              className="h-auto max-h-[500px] object-contain rounded-lg shadow-sm"
            />
          </div>

          {/* Right Column - Pet Details */}
          <div className="md:w-2/3 p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{pet.name}</h1>
              <p className="text-xl text-gray-600 mb-4">{pet.breed}</p>
              
              <div className="flex items-center mb-6">
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                  {pet.category}
                </span>
                <span className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${
                  pet.stock > 10 
                    ? 'bg-green-100 text-green-800' 
                    : pet.stock > 0 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {pet.stock > 10 
                    ? 'Available' 
                    : pet.stock > 0 
                    ? `Only ${pet.stock} left` 
                    : 'Not Available'}
                </span>
              </div>
              
              <p className="text-3xl font-bold text-gray-900 mb-6">
                ${parseFloat(pet.price || 0).toFixed(2)}
              </p>
              
              <div className="border-t border-b border-gray-200 py-6 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  {pet.description}
                </p>
              </div>
              
              {pet.stock > 0 && (
                <div className="mb-6">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex">
                    <button
                      onClick={decrementQuantity}
                      className="px-3 py-2 bg-gray-200 rounded-l-lg hover:bg-gray-300"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      value={quantity}
                      onChange={handleQuantityChange}
                      min="1"
                      max={pet.stock}
                      className="w-16 px-3 py-2 text-center border-t border-b border-gray-300 focus:outline-none"
                    />
                    <button
                      onClick={incrementQuantity}
                      className="px-3 py-2 bg-gray-200 rounded-r-lg hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
              
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                <button
                  onClick={addToCart}
                  className="px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={pet.stock <= 0}
                >
                  {pet.stock > 0 ? 'Add to Cart' : 'Not Available'}
                </button>
                <Link
                  to="/cart"
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300 text-center"
                >
                  View Cart
                </Link>
              </div>
            </div>
            
            {/* Pet Specifications */}
            <div className="mt-10 border-t border-gray-200 pt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Pet Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 mb-1">Age:</p>
                  <p className="font-medium">{pet.age || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Size:</p>
                  <p className="font-medium">{pet.size || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Color:</p>
                  <p className="font-medium">{pet.color || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Gender:</p>
                  <p className="font-medium">{pet.gender || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Vaccinated:</p>
                  <p className="font-medium">{pet.vaccinated ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetail;