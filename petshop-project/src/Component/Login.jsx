import React from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-1">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-6">Login to your Pet Shop account</p>

        <form className="space-y-4">
          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 text-[#8B4513]"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 text-[#8B4513]"
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a href="/forgot-password" className="text-sm text-orange-500 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{' '}
          <a href="/register" className="text-orange-500 font-medium hover:underline">
            Register now
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
