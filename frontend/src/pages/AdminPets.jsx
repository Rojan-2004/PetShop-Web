import React, { useState, useEffect } from 'react';
import { petService } from '../services/api';

const AdminPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPet, setCurrentPet] = useState(null);
  const [petForm, setPetForm] = useState({
    name: '',
    breed: '',
    age: '',
    price: '',
    description: '',
    image_url: '',
    category: 'dog'
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const response = await petService.getAllPets();
      setPets(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching pets:', err);
      setError('Failed to load pets. Please try again later.');
      
      // Mock data for demonstration
      setPets([
        {
          id: 1,
          name: 'Golden Retriever',
          breed: 'Retriever',
          age: 2,
          price: 599.99,
          description: 'Friendly and energetic dog',
          image_url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=400&fit=crop',
          category: 'dog',
          created_at: '2025-01-15T10:30:00Z'
        },
        {
          id: 2,
          name: 'Persian Cat',
          breed: 'Persian',
          age: 1,
          price: 399.99,
          description: 'Beautiful long-haired cat',
          image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=400&fit=crop',
          category: 'cat',
          created_at: '2025-01-14T14:15:00Z'
        }
      ]);
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

  const filteredPets = pets.filter(pet => 
    pet.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.breed?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPet = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      
      // Add all pet data to FormData
      Object.keys(petForm).forEach(key => {
        if (key !== 'image_url') {
          formData.append(key, petForm[key]);
        }
      });
      
      // Add image file if selected
      if (selectedImage) {
        formData.append('image', selectedImage);
      } else if (petForm.image_url) {
        formData.append('image_url', petForm.image_url);
      }

      await petService.createPet(formData);
      setShowAddModal(false);
      setPetForm({
        name: '',
        breed: '',
        age: '',
        price: '',
        description: '',
        image_url: '',
        category: 'dog'
      });
      setSelectedImage(null);
      setImagePreview(null);
      fetchPets();
    } catch (err) {
      console.error('Error adding pet:', err);
      setError('Failed to add pet. Please try again.');
    }
  };

  const handleEditPet = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      
      // Add all pet data to FormData
      Object.keys(petForm).forEach(key => {
        if (key !== 'image_url') {
          formData.append(key, petForm[key]);
        }
      });
      
      // Add image file if selected
      if (selectedImage) {
        formData.append('image', selectedImage);
      } else if (petForm.image_url) {
        formData.append('image_url', petForm.image_url);
      }

      await petService.updatePet(currentPet.id, formData);
      setShowEditModal(false);
      setCurrentPet(null);
      setPetForm({
        name: '',
        breed: '',
        age: '',
        price: '',
        description: '',
        image_url: '',
        category: 'dog'
      });
      setSelectedImage(null);
      setImagePreview(null);
      fetchPets();
    } catch (err) {
      console.error('Error updating pet:', err);
      setError('Failed to update pet. Please try again.');
    }
  };

  const handleDeletePet = async (id) => {
    if (window.confirm('Are you sure you want to delete this pet? This action cannot be undone.')) {
      try {
        await petService.deletePet(id);
        fetchPets();
      } catch (err) {
        console.error('Error deleting pet:', err);
        setError('Failed to delete pet. Please try again.');
      }
    }
  };

  const openEditModal = (pet) => {
    setCurrentPet(pet);
    setPetForm({
      name: pet.name,
      breed: pet.breed,
      age: pet.age,
      price: pet.price,
      description: pet.description,
      image_url: pet.image_url,
      category: pet.category
    });
    setSelectedImage(null);
    setImagePreview(null);
    setShowEditModal(true);
  };

  const getCategoryBadgeColor = (category) => {
    switch (category.toLowerCase()) {
      case 'dog':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cat':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'bird':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rabbit':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Pet Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors"
        >
          Add New Pet
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search pets by name, breed, or category..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-gray-800"></div>
            <p className="mt-2 text-gray-600">Loading pets...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pet
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Breed
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPets.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                      No pets found.
                    </td>
                  </tr>
                ) : (
                  filteredPets.map((pet) => (
                    <tr key={pet.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={pet.image_url?.startsWith('http') ? pet.image_url : `http://localhost:3081${pet.image_url}`}
                            alt={pet.name}
                            className="w-12 h-12 rounded-lg object-cover mr-3"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100&h=100&fit=crop';
                            }}
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{pet.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{pet.breed}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{pet.age} years</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Rs.{pet.price}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${getCategoryBadgeColor(pet.category)}`}>
                          {pet.category}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => openEditModal(pet)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeletePet(pet.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Pet Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Add New Pet</h2>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                  &times;
                </button>
              </div>
              <form onSubmit={handleAddPet}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={petForm.name}
                      onChange={(e) => setPetForm({...petForm, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                    <input
                      type="text"
                      value={petForm.breed}
                      onChange={(e) => setPetForm({...petForm, breed: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age (years)</label>
                    <input
                      type="number"
                      value={petForm.age}
                      onChange={(e) => setPetForm({...petForm, age: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                      type="number"
                      step="0.01"
                      value={petForm.price}
                      onChange={(e) => setPetForm({...petForm, price: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={petForm.category}
                      onChange={(e) => setPetForm({...petForm, category: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      required
                    >
                      <option value="dog">Dog</option>
                      <option value="cat">Cat</option>
                      <option value="bird">Bird</option>
                      <option value="rabbit">Rabbit</option>
                      <option value="fish">Fish</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pet Image</label>
                    <div className="space-y-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      />
                      {imagePreview && (
                        <div className="mt-2">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                          />
                        </div>
                      )}
                      <div className="text-sm text-gray-500">
                        Or enter image URL:
                      </div>
                      <input
                        type="url"
                        value={petForm.image_url}
                        onChange={(e) => setPetForm({...petForm, image_url: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={petForm.description}
                      onChange={(e) => setPetForm({...petForm, description: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      rows="3"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-900"
                  >
                    Add Pet
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Pet Modal */}
      {showEditModal && currentPet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Edit Pet</h2>
                <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                  &times;
                </button>
              </div>
              <form onSubmit={handleEditPet}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={petForm.name}
                      onChange={(e) => setPetForm({...petForm, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                    <input
                      type="text"
                      value={petForm.breed}
                      onChange={(e) => setPetForm({...petForm, breed: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age (years)</label>
                    <input
                      type="number"
                      value={petForm.age}
                      onChange={(e) => setPetForm({...petForm, age: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                      type="number"
                      step="0.01"
                      value={petForm.price}
                      onChange={(e) => setPetForm({...petForm, price: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={petForm.category}
                      onChange={(e) => setPetForm({...petForm, category: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      required
                    >
                      <option value="dog">Dog</option>
                      <option value="cat">Cat</option>
                      <option value="bird">Bird</option>
                      <option value="rabbit">Rabbit</option>
                      <option value="fish">Fish</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pet Image</label>
                    <div className="space-y-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      />
                      {imagePreview && (
                        <div className="mt-2">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                          />
                        </div>
                      )}
                      {!imagePreview && currentPet?.image_url && (
                        <div className="mt-2">
                          <img
                            src={currentPet.image_url.startsWith('http') ? currentPet.image_url : `http://localhost:3081${currentPet.image_url}`}
                            alt="Current"
                            className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                          />
                          <p className="text-sm text-gray-500 mt-1">Current image</p>
                        </div>
                      )}
                      <div className="text-sm text-gray-500">
                        Or enter image URL:
                      </div>
                      <input
                        type="url"
                        value={petForm.image_url}
                        onChange={(e) => setPetForm({...petForm, image_url: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={petForm.description}
                      onChange={(e) => setPetForm({...petForm, description: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      rows="3"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Update Pet
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPets;