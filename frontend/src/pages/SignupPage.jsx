import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { authService } from '../services/api'; // Assuming this is still needed

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'buyer', // default role for signup
      };

      // In a real application, you would uncomment the line below to call your API.
      // await authService.register(userData);

      setMessage('Signup successful! You can now log in.');
      setSuccess(true);

      // Clear form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Signup failed. Please try again.');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Container for the whole page */}
      <div className="max-w-7xl w-full flex flex-col lg:flex-row bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Left Side - Pet Illustration */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-indigo-50 to-blue-100 items-center justify-center p-12">
          <div className="max-w-lg w-full text-center">
            {/* New Pet-Themed SVG */}
            <svg
              viewBox="0 0 500 500"
              className="w-full h-auto max-w-md mx-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background Paw Print */}
              <path
                d="M250 150c-30 0-50 10-50 30s20 30 50 30 50-10 50-30-20-30-50-30zm-90 80c-25 0-40 10-40 25s15 25 40 25 40-10 40-25-15-25-40-25zm180 0c-25 0-40 10-40 25s15 25 40 25 40-10 40-25-15-25-40-25zm-180 70c-20 0-35 5-35 20s15 20 35 20 35-5 35-20-15-20-35-20zm180 0c-20 0-35 5-35 20s15 20 35 20 35-5 35-20-15-20-35-20zm-90-50c-40 0-70 20-70 50s30 50 70 50 70-20 70-50-30-50-70-50z"
                fill="#C7D2FE"
                opacity="0.4"
                transform="translate(-50, 50)"
              />
              
              {/* Pet Silhouettes */}
              <g transform="translate(150, 100)">
                {/* Dog */}
                <path
                  d="M100 150q-20-10-30-50q-10-40 20-50t50 20q30 30 0 70zM120 120c0-10-10-20-20-20s-20 10-20 20 10 20 20 20 20-10 20-20zM140 120c0-10-10-20-20-20s-20 10-20 20 10 20 20 20 20-10 20-20z"
                  fill="#4338CA"
                />
                <path
                  d="M100 150a40 40 0 01-40-40a20 20 0 01-20 0a20 20 0 00-20 20a40 40 0 0040 40z"
                  fill="#4338CA"
                />
                <path d="M120 120a10 10 0 100-20a10 10 0 000 20z" fill="#9CA3AF" />
                <path d="M140 120a10 10 0 100-20a10 10 0 000 20z" fill="#9CA3AF" />

                {/* Cat */}
                <path
                  d="M300 200q-20-10-30-50q-10-40 20-50t50 20q30 30 0 70zM320 170c0-10-10-20-20-20s-20 10-20 20 10 20 20 20 20-10 20-20zM340 170c0-10-10-20-20-20s-20 10-20 20 10 20 20 20 20-10 20-20z"
                  fill="#3B82F6"
                />
                <path
                  d="M300 200a40 40 0 01-40-40a20 20 0 01-20 0a20 20 0 00-20 20a40 40 0 0040 40z"
                  fill="#3B82F6"
                />
                <path d="M320 170a10 10 0 100-20a10 10 0 000 20z" fill="#9CA3AF" />
                <path d="M340 170a10 10 0 100-20a10 10 0 000 20z" fill="#9CA3AF" />
              </g>

              {/* More Paw Prints */}
              <g fill="#A5B4FC" opacity="0.6">
                <circle cx="50" cy="50" r="15" />
                <circle cx="100" cy="100" r="10" />
                <circle cx="450" cy="450" r="15" />
                <circle cx="400" cy="400" r="10" />
                <circle cx="300" cy="50" r="10" />
              </g>
            </svg>

            {/* Text Content */}
            <div className="mt-12">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Join Our Pet Lover's Community
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Create your account and become a part of a thriving community of pet owners. 
                Get personalized recommendations for your furry friends and exclusive discounts.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4 mt-8 text-left">
              <div className="flex items-center space-x-3">
                <span className="text-indigo-600 text-xl">
                  ✓
                </span>
                <span className="text-gray-700">Personalized pet care recommendations</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-indigo-600 text-xl">
                  ✓
                </span>
                <span className="text-gray-700">Exclusive member discounts on pet supplies</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-indigo-600 text-xl">
                  ✓
                </span>
                <span className="text-gray-700">Connect with other pet owners</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="flex-1 flex items-center justify-center p-8 sm:p-12">
          <div className="max-w-md w-full space-y-8">
            {/* Form Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Create Your Account</h2>
              <p className="mt-2 text-sm text-gray-600">
                Start your pet care journey with us today
              </p>
            </div>

            {/* Form */}
            <div className="bg-white py-8 px-6 shadow-sm rounded-lg border border-gray-100">
              {message && (
                <div className={`mb-4 p-3 rounded-lg text-sm ${
                  success
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 bg-gray-50 hover:bg-white"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 bg-gray-50 hover:bg-white"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 bg-gray-50 hover:bg-white"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 bg-gray-50 hover:bg-white"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1" 
                    required
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    I agree to the{' '}
                    <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">
                      Privacy Policy
                    </a>
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 font-medium"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </span>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-800 transition duration-200">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
