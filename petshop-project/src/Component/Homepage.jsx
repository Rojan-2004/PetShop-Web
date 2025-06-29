import React from 'react';
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';



const categories = [
  { name: 'Accessories', products: 84, color: 'bg-purple-300' },
  { name: 'Food', products: 64, color: 'bg-green-200' },
  { name: 'Furniture', products: 22, color: 'bg-sky-300' },
  { name: 'Bags', products: 16, color: 'bg-pink-300' },
];

const featuredProducts = [
  { name: 'Premium Dog Food', price: '$19.99' },
  { name: 'Premium Cat Food', price: '$19.99' },
  { name: 'Premium Dog Food', price: '$19.99' },
];

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-6 py-12 bg-orange-50 relative overflow-hidden">
        {/* Text */}
        <div className="max-w-xl z-10">
          <h4 className="text-orange-500 font-semibold mb-2">Pet Shop</h4>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            A pet store with<br /> everything you need
          </h1>
          <p className="text-gray-600 mb-6">
            Sociis blandit et pellentesque aliquet at quisque tortor lacinia nullam. Mattis aenean scelerisque dui libero
          </p>
          <button className="bg-black text-white px-6 py-3 rounded-md shadow hover:bg-gray-800 transition">Shop Now</button>
        </div>

        {/* Background Illustration */}
        <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
          <div className="w-full h-full bg-orange-400 rounded-l-full relative flex items-center justify-center">
            {/* Placeholder for Image */}
            <div className="absolute w-[250px] h-[250px] bg-white opacity-20 rounded-full"></div>
            <div className="absolute w-[350px] h-[350px] bg-orange-300 opacity-20 rounded-full"></div>
            <div className="w-72 h-72 bg-white rounded-full opacity-40 z-10"></div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6">Browse by category</h2>
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
          {categories.map((cat, index) => (
            <div key={index} className="min-w-[160px] p-4 rounded-xl shadow bg-white">
              <div className={`h-24 mb-3 rounded-lg ${cat.color} flex items-center justify-center`}>
                {/* Image placeholder */}
                <div className="w-12 h-12 bg-white rounded-full"></div>
              </div>
              <h4 className="font-semibold">{cat.name}</h4>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{cat.products} products</span>
                <FaArrowRight className="text-orange-500" />
              </div>
            </div>
          ))}
          {/* Arrows */}
          <div className="flex gap-2 ml-2">
            <button className="bg-white border p-2 rounded-full hover:bg-gray-100">
              <FaChevronLeft />
            </button>
            <button className="bg-white border p-2 rounded-full hover:bg-gray-100">
              <FaChevronRight />
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6">Featured products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((item, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow">
              <div className="bg-gray-300 h-48 rounded-md mb-4"></div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.price}</p>
                </div>
                <FaHeart className="text-orange-400 cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </section> 
    </div>
  );
};

export default Homepage;
