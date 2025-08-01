import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const response = await authService.login(formData.email, formData.password);
      setMessage('Login successful!');

      // Dispatch events to notify other components
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('userStateChanged'));
      
      // Redirect based on user role
      if (response.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/buyer');
      }
    } catch (err) {
      console.error('Login error:', err);
      setMessage(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      {/* Main Content Card */}
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-16">
          <div className="max-w-md w-full space-y-8">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-4xl font-extrabold text-gray-900">Welcome Back</h2>
              <p className="mt-4 text-lg text-gray-600">
                Sign in to your account and find your new best friend!
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {message && (
                <div className={`p-4 rounded-lg text-sm ${
                  message.includes('successful') 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition duration-200"
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
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition duration-200"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded" />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-sm font-medium text-sky-600 hover:text-sky-800 transition duration-200">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-sky-600 text-white py-3 px-4 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition duration-200 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing In...
                    </span>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/signup" className="font-medium text-sky-600 hover:text-sky-800 transition duration-200">
                    Create one here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Pet-themed SVG */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-12 bg-gradient-to-br from-teal-50 to-cyan-100">
          <div className="max-w-lg w-full text-center">
            <svg
              viewBox="0 0 500 500"
              className="w-full h-auto max-w-md mx-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="petGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#38bdf8'}} />
                  <stop offset="100%" style={{stopColor: '#0ea5e9'}} />
                </linearGradient>
                <radialGradient id="sunGradient">
                  <stop offset="0%" stopColor="#fde047" />
                  <stop offset="100%" stopColor="#facc15" />
                </radialGradient>
              </defs>

              {/* Sun */}
              <circle cx="400" cy="100" r="50" fill="url(#sunGradient)" />
              
              {/* Ground */}
              <rect x="0" y="350" width="500" height="150" rx="20" fill="#d1fae5" />
              <rect x="0" y="360" width="500" height="140" rx="20" fill="#a7f3d0" />

              {/* Pet House */}
              <path d="M120 250 L120 350 L200 350 L200 250 L160 200 Z" fill="#fef08a" />
              <rect x="135" y="270" width="50" height="80" rx="5" fill="#facc15" />
              
              {/* Dog */}
              <path d="M300 350 Q310 280 370 280 T440 350 Z" fill="#9ca3af" />
              <path d="M360 350 L380 350 L370 300 Q360 300 360 320 Z" fill="#9ca3af" /> {/* Tail */}
              <circle cx="390" cy="310" r="15" fill="#9ca3af" /> {/* Head */}
              <circle cx="395" cy="305" r="3" fill="#374151" /> {/* Eye */}
              
              {/* Cat */}
              <path d="M200 350 Q210 280 270 280 T340 350 Z" fill="#fda4af" />
              <path d="M280 350 L300 350 L290 300 Q280 300 280 320 Z" fill="#fda4af" /> {/* Tail */}
              <circle cx="310" cy="310" r="15" fill="#fda4af" /> {/* Head */}
              <circle cx="315" cy="305" r="3" fill="#374151" /> {/* Eye */}
            </svg>
            <div className="text-center mt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Your One-Stop Shop for Happy Pets
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Find the best food, toys, and accessories for your furry, feathered, or scaly friends.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-8 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-800">10K+</div>
                <div className="text-sm text-gray-600">Happy Pets</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">50+</div>
                <div className="text-sm text-gray-600">Breeds</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">99%</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
