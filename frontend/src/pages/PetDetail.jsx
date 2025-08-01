import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { petService, cartService } from '../services/api';
import Notification from '../components/Notification';

const PetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const fetchPet = async () => {
    try {
      setLoading(true);
      const response = await petService.getPetById(id);
      setPet(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching pet:', err);
      setError('Failed to load pet details. Please try again later.');
      
      // Mock data for demonstration
      setPet({
        id: parseInt(id),
        name: 'Golden Retriever',
        breed: 'Retriever',
        age: 2,
        price: 599.99,
        description: 'This beautiful Golden Retriever is a friendly and energetic dog, perfect for families with children. Known for their loyalty and intelligence, Golden Retrievers make excellent companions and are easy to train. This particular pup has been well-socialized and is ready to become a beloved member of your family.',
        image_url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=600&fit=crop',
        category: 'dog',
        weight: '25-30 kg',
        height: '55-61 cm',
        color: 'Golden',
        gender: 'Male',
        vaccinated: true,
        health_status: 'Excellent',
        training_level: 'Basic',
        good_with_kids: true,
        good_with_pets: true,
        energy_level: 'High',
        grooming_needs: 'Moderate',
        images: [
          'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=600&h=600&fit=crop'
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPet();
    }
  }, [id]);

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setNotification({
          message: 'Please login to add pets to your cart.',
          type: 'error'
        });
        setTimeout(() => navigate('/login'), 2000);
        return;
      }

      await cartService.addToCart(pet.id, 1);
      setNotification({
        message: `${pet.name} has been added to your cart!`,
        type: 'success'
      });
    } catch (err) {
      console.error('Error adding to cart:', err);
      setNotification({
        message: 'Failed to add pet to cart. Please try again.',
        type: 'error'
      });
    } finally {
      setAddingToCart(false);
    }
  };

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
          <p className="mt-4 text-xl text-gray-600">Loading pet details...</p>
        </div>
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Pet not found</h3>
          <p className="text-gray-600 mb-4">{error || 'The pet you are looking for does not exist.'}</p>
          <Link 
            to="/pets" 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const images = pet.images || [pet.image_url];

  return (
    <div className="min-h-screen bg-gray-50">
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)} 
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <Link to="/pets" className="ml-1 text-gray-700 hover:text-blue-600 md:ml-2">
                  Pets
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="ml-1 text-gray-500 md:ml-2">{pet.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="mb-4">
              <img
                src={images[selectedImage]?.startsWith('http') ? images[selectedImage] : `http://localhost:3081${images[selectedImage]}`}
                alt={pet.name}
                className="w-full h-96 object-cover rounded-xl shadow-lg"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=600&fit=crop';
                }}
              />
            </div>
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image?.startsWith('http') ? image : `http://localhost:3081${image}`}
                      alt={`${pet.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=150&h=150&fit=crop';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pet Details */}
          <div>
            <div className="mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryBadgeColor(pet.category)}`}>
                {pet.category}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{pet.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{pet.breed}</p>
            
            <div className="text-3xl font-bold text-blue-600 mb-6">
              Rs.{pet.price}
            </div>

            <div className="prose prose-gray max-w-none mb-8">
              <p>{pet.description}</p>
            </div>

            {/* Pet Specifications */}
            <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pet Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Age</span>
                  <p className="font-medium">{pet.age} years</p>
                </div>
                {pet.weight && (
                  <div>
                    <span className="text-sm text-gray-500">Weight</span>
                    <p className="font-medium">{pet.weight}</p>
                  </div>
                )}
                {pet.height && (
                  <div>
                    <span className="text-sm text-gray-500">Height</span>
                    <p className="font-medium">{pet.height}</p>
                  </div>
                )}
                {pet.color && (
                  <div>
                    <span className="text-sm text-gray-500">Color</span>
                    <p className="font-medium">{pet.color}</p>
                  </div>
                )}
                {pet.gender && (
                  <div>
                    <span className="text-sm text-gray-500">Gender</span>
                    <p className="font-medium">{pet.gender}</p>
                  </div>
                )}
                {pet.health_status && (
                  <div>
                    <span className="text-sm text-gray-500">Health</span>
                    <p className="font-medium">{pet.health_status}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Info */}
            {(pet.good_with_kids || pet.good_with_pets || pet.energy_level || pet.grooming_needs) && (
              <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Characteristics</h3>
                <div className="space-y-3">
                  {pet.good_with_kids && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Good with children</span>
                    </div>
                  )}
                  {pet.good_with_pets && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Good with other pets</span>
                    </div>
                  )}
                  {pet.energy_level && (
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">Energy Level:</span>
                      <span className="font-medium">{pet.energy_level}</span>
                    </div>
                  )}
                  {pet.grooming_needs && (
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">Grooming Needs:</span>
                      <span className="font-medium">{pet.grooming_needs}</span>
                    </div>
                  )}
                  {pet.vaccinated && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Fully vaccinated</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="flex-1 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addingToCart ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </div>
                ) : (
                  'Add to Cart'
                )}
              </button>
              <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors">
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetail;