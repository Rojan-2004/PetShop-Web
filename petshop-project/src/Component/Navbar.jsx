import React from 'react';
import { FaPhoneAlt, FaHeart, FaShoppingCart, FaSearch, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="font-sans text-sm">
      <div className="bg-gray-100 flex justify-between items-center px-6 py-2 text-gray-700">
        <div className="flex items-center space-x-4">
          <span className="flex items-center gap-1">
            <FaPhoneAlt className="text-sm" />
            9841994110
          </span>
          <span className="flex items-center gap-1">
            <FaEnvelope className="text-sm" />
            rojan@outlook.com
          </span>
        </div>
        <div className="flex items-center gap-1">
          <FaMapMarkerAlt className="text-sm" />
          <span>446600 Kathmandu Chabahil,</span>
        </div>
      </div>

      <div className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-lg">
          <span role="img" aria-label="paw">🐾</span>
          Pet Shop
        </div>

        {/* Menu */}
        <nav className="flex items-center space-x-6 text-gray-800 font-medium">
          <a href="#" className="text-orange-500 border-b-2 border-orange-500 pb-1">Home</a>
          <a href="#" className="hover:text-orange-500">Shop</a>
          <a href="#" className="hover:text-orange-500">About Us</a>
          <a href="#" className="hover:text-orange-500">Contact Us</a>
        </nav>

        {/* Search + Icons */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none"
            />
            <FaSearch className="absolute right-3 top-2.5 text-black cursor-pointer" />
          </div>
          <FaHeart className="cursor-pointer text-xl" />
          <div className="relative">
            <FaShoppingCart className="cursor-pointer text-xl" />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1.5 rounded-full">1</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
