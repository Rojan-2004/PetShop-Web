import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LatestCollections from '../components/LatestCollections';
import Reviews from '../components/Reviews';

const PetShopLanding = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all sections
    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: 'Wide Selection',
      description: 'Explore thousands of pets across all breeds and categories'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      title: 'Fast Delivery',
      description: 'Get your pets delivered to your doorstep within 2-3 business days'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      title: 'Best Prices',
      description: 'Enjoy competitive prices and amazing discounts on your favorite pets'
    }
  ];

  const popularPets = [
    {
      id: 1,
      title: "Golden Retriever",
      breed: "Retriever",
      price: "Rs.599",
      originalPrice: "Rs.799",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=400&fit=crop",
      rating: 4.8,
      badge: "Popular"
    },
    {
      id: 2,
      title: "Persian Cat",
      breed: "Persian",
      price: "Rs.399",
      originalPrice: "Rs.499",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=400&fit=crop",
      rating: 4.9,
      badge: "Bestseller"
    },
    {
      id: 3,
      title: "Budgerigar",
      breed: "Parakeet",
      price: "Rs.49",
      originalPrice: "Rs.69",
      image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=300&h=400&fit=crop",
      rating: 4.7,
      badge: "Trending"
    },
    {
      id: 4,
      title: "Holland Lop",
      breed: "Rabbit",
      price: "Rs.89",
      originalPrice: "Rs.119",
      image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=300&h=400&fit=crop",
      rating: 4.6,
      badge: "Adorable"
    }
  ];

  const bestSellingPets = [
    {
      id: 1,
      title: "Labrador Retriever",
      breed: "Retriever",
      price: "Rs.699",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=400&fit=crop",
      sales: "500+ adopted"
    },
    {
      id: 2,
      title: "Maine Coon",
      breed: "Cat",
      price: "Rs.599",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=400&fit=crop",
      sales: "450+ adopted"
    },
    {
      id: 3,
      title: "Cockatiel",
      breed: "Bird",
      price: "Rs.79",
      image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=300&h=400&fit=crop",
      sales: "400+ adopted"
    },
    {
      id: 4,
      title: "Netherland Dwarf",
      breed: "Rabbit",
      price: "Rs.99",
      image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=300&h=400&fit=crop",
      sales: "380+ adopted"
    },
    {
      id: 5,
      title: "Siamese Cat",
      breed: "Cat",
      price: "Rs.549",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=400&fit=crop",
      sales: "350+ adopted"
    }
  ];

  const categories = [
    'Dogs', 'Cats', 'Birds', 'Rabbits', 'Fish', 'Hamsters', 
    'Guinea Pigs', 'Reptiles', 'Horses', 'Exotic', 'Farm Animals', 'Wildlife'
  ];

  return (
    <div className="min-h-screen">
      {/* Scroll Progress Indicator */}
      <div 
        className="scroll-indicator"
        style={{
          width: `${(scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`
        }}
      ></div>

      {/* Hero Section - Minimal Design */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 
              className={`text-5xl md:text-7xl font-bold text-gray-900 mb-6 transition-all duration-1000 ${
                isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              id="hero"
              data-animate
            >
              Find Your Perfect
              <span className="block text-blue-600">Pet Companion</span>
            </h1>
            
            <p 
              className={`text-xl text-gray-600 mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
                isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Discover, explore, and adopt pets from our vast collection. From popular breeds to unique companions,
              find your next best friend with PetShop.
            </p>
            
            <div 
              className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 ${
                isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <Link 
                to="/pets" 
                className="bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Browse Pets
              </Link>
              <Link 
                to="/signup" 
                className="border-2 border-gray-800 text-gray-800 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                Join PetShop
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-200 rounded-full opacity-20 animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 bg-green-200 rounded-full opacity-20 animate-bounce" style={{animationDelay: '2s'}}></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group cursor-pointer">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-200 transition-colors">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="text-gray-700 group-hover:text-gray-800 transition-colors">Pets Available</div>
            </div>
            
            <div className="text-center group cursor-pointer">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-200 transition-colors">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-gray-700 group-hover:text-gray-800 transition-colors">Happy Families</div>
            </div>
            
            <div className="text-center group cursor-pointer">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-200 transition-colors">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-gray-700 group-hover:text-gray-800 transition-colors">Quality Assured</div>
            </div>
            
            <div className="text-center group cursor-pointer">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-200 transition-colors">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-gray-700 group-hover:text-gray-800 transition-colors">24/7 Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Pets Section with Scroll Animation */}
      <section 
        id="popular-pets" 
        className="py-20 bg-gray-50"
        data-animate
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible['popular-pets'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Pets</h2>
            <p className="text-xl text-gray-600">Most loved companions by our community</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularPets.map((pet, index) => (
              <div 
                key={pet.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                  isVisible['popular-pets'] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: isVisible['popular-pets'] ? `${index * 100}ms` : '0ms'
                }}
              >
                <div className="relative overflow-hidden rounded-t-xl">
                  <img 
                    src={pet.image} 
                    alt={pet.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                      {pet.badge}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full">
                    <span className="text-yellow-400 text-sm">{pet.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                    {pet.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{pet.breed}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-gray-900">{pet.price}</span>
                      <span className="text-sm text-gray-500 line-through">{pet.originalPrice}</span>
                    </div>
                    <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
                      Adopt Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div 
            className={`text-center mt-12 transition-all duration-1000 delay-500 ${
              isVisible['popular-pets'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Link 
              to="/pets" 
              className="inline-block bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-all duration-300 transform hover:scale-105"
            >
              View All Popular Pets
            </Link>
          </div>
        </div>
      </section>

      {/* Best Selling Pets Section with Parallax Scroll */}
      <section 
        id="best-selling" 
        className="py-20 bg-white relative overflow-hidden"
        data-animate
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible['best-selling'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Best Selling Pets</h2>
            <p className="text-xl text-gray-600">Most adopted companions this month</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {bestSellingPets.map((pet, index) => (
              <div 
                key={pet.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 ${
                  isVisible['best-selling'] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: isVisible['best-selling'] ? `${index * 100}ms` : '0ms'
                }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={pet.image} 
                    alt={pet.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    Hot
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{pet.title}</h3>
                  <p className="text-gray-600 mb-2">{pet.breed}</p>
                  <p className="text-sm text-green-600 font-medium mb-3">{pet.sales}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">{pet.price}</span>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-all duration-300 transform hover:scale-105">
                      Adopt Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Staggered Animation */}
      <section 
        id="features" 
        className="py-20 bg-gray-50"
        data-animate
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose PetShop?</h2>
            <p className="text-xl text-gray-600">
              We're committed to providing the best pet adoption experience with unmatched quality and service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                  isVisible.features 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: isVisible.features ? `${index * 200}ms` : '0ms'
                }}
              >
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="text-gray-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Collections Component */}
      <LatestCollections />

      {/* Categories Section with Wave Animation */}
      <section 
        id="categories" 
        className="py-20 bg-white"
        data-animate
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible.categories ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Categories</h2>
            <p className="text-xl text-gray-600">Find pets in your favorite categories</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className={`bg-white p-4 rounded-lg text-center hover:shadow-md transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-1 border-2 border-transparent hover:border-gray-300 ${
                  isVisible.categories 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  backgroundColor: '#cdcdcd', 
                  transitionDelay: isVisible.categories ? `${index * 50}ms` : '0ms'
                }}
              >
                <span className="text-gray-800 font-medium hover:text-gray-900 transition-colors">{category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with Counter Animation */}
      <section className="py-20 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-gray-300 text-lg">Pets in Stock</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-gray-300 text-lg">Happy Families</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-gray-300 text-lg">Breeds Featured</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-gray-300 text-lg">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Component */}
      <Reviews />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Find Your Perfect Pet?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of pet lovers who have made PetShop their go-to destination for quality pets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/pets" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Browse Pets
            </Link>
            <Link 
              to="/signup" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Join PetShop
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PetShopLanding;