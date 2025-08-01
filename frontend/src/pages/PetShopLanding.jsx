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
        <svg className="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      ),
      title: 'Healthy Pets',
      description: 'All our pets are health-checked, vaccinated, and come with health certificates'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 7c0-1.1-.9-2-2-2h-3v2h3v11l-7-3-7 3V7h3V5H5c-1.1 0-2 .9-2 2v11l9-4 9 4V7z"/>
        </svg>
      ),
      title: 'Fast Delivery',
      description: 'Safe and secure pet transportation to your home within 24-48 hours'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      title: 'Best Prices',
      description: 'Competitive prices and amazing deals on your favorite pets and supplies'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
        </svg>
      ),
      title: 'Secure Process',
      description: 'Safe and secure adoption process with proper documentation and support'
    }
  ];

  const popularPets = [
    {
      id: 1,
      name: "Buddy",
      breed: "Golden Retriever",
      price: "$1,200",
      originalPrice: "$1,500",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=400&fit=crop",
      rating: 4.8,
      badge: "Popular"
    },
    {
      id: 2,
      name: "Whiskers",
      breed: "Persian Cat",
      price: "$800",
      originalPrice: "$1,000",
      image: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=300&h=400&fit=crop",
      rating: 4.9,
      badge: "Featured"
    },
    {
      id: 3,
      name: "Charlie",
      breed: "Beagle",
      price: "$900",
      originalPrice: "$1,100",
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=300&h=400&fit=crop",
      rating: 4.7,
      badge: "Trending"
    },
    {
      id: 4,
      name: "Luna",
      breed: "Siamese Cat",
      price: "$700",
      originalPrice: "$900",
      image: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=300&h=400&fit=crop",
      rating: 4.6,
      badge: "New"
    }
  ];

  const featuredPets = [
    {
      id: 1,
      name: "Max",
      breed: "German Shepherd",
      price: "$1,500",
      image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=300&h=400&fit=crop",
      adoptions: "50+ adopted"
    },
    {
      id: 2,
      name: "Bella",
      breed: "Maine Coon",
      price: "$950",
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300&h=400&fit=crop",
      adoptions: "45+ adopted"
    },
    {
      id: 3,
      name: "Rocky",
      breed: "Bulldog",
      price: "$1,800",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=400&fit=crop",
      adoptions: "40+ adopted"
    },
    {
      id: 4,
      name: "Mittens",
      breed: "British Shorthair",
      price: "$850",
      image: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=300&h=400&fit=crop",
      adoptions: "38+ adopted"
    },
    {
      id: 5,
      name: "Oscar",
      breed: "Labrador",
      price: "$1,100",
      image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=300&h=400&fit=crop",
      adoptions: "35+ adopted"
    }
  ];

  const categories = [
    'Dogs', 'Cats', 'Birds', 'Fish', 'Small Pets', 'Reptiles', 
    'Pet Supplies', 'Pet Food', 'Toys', 'Accessories', 'Healthcare', 'Training'
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
      <section id="home" className="relative py-24 bg-gray-50" style={{backgroundColor: '#f8f9fa'}}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slideInLeft">
              <div className="inline-block mb-6">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                  New Pets Every Week!
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-gray-900">
                Your Gateway to
                <span className="block text-black">Perfect Companions</span>
              </h1>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed animate-fadeInUp" style={{animationDelay: '0.8s'}}>
                Discover, explore, and adopt pets from our loving collection. From playful puppies to cuddly kittens, 
                find your next family member at unbeatable prices with complete health guarantees!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fadeInUp" style={{animationDelay: '1s'}}>
                <Link 
                  to="/signup" 
                  className="group bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 text-center transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden"
                >
                  <span className="relative z-10">Start Adopting</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </Link>
                <button className="group border-3 border-gray-800 text-gray-800 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden">
                  <span className="relative z-10">Browse Pets</span>
                  <div className="absolute inset-0 bg-gray-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </div>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-3 gap-6 animate-fadeInUp" style={{animationDelay: '1.2s'}}>
                <div className="text-center group cursor-pointer transform hover:scale-110 transition-all duration-300">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 hover:shadow-xl">
                    <div className="text-4xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">500+</div>
                    <div className="text-gray-700 group-hover:text-gray-800 transition-colors">Pets Available</div>
                  </div>
                </div>
                <div className="text-center group cursor-pointer transform hover:scale-110 transition-all duration-300">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 hover:shadow-xl">
                    <div className="text-4xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">2K+</div>
                    <div className="text-gray-700 group-hover:text-gray-800 transition-colors">Happy Families</div>
                  </div>
                </div>
                <div className="text-center group cursor-pointer transform hover:scale-110 transition-all duration-300">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 hover:shadow-xl">
                    <div className="text-4xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">99%</div>
                    <div className="text-gray-700 group-hover:text-gray-800 transition-colors">Satisfaction Rate</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Right Side with Image */}
            <div className="relative animate-slideInRight">
              {/* Main Image Container */}
              <div className="relative group">
                {/* Beautiful Pet Shop Image */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl transform group-hover:scale-105 transition-all duration-500 hover:shadow-3xl">
                  <img 
                    src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=500&fit=crop" 
                    alt="Happy pets in a loving environment"
                    className="w-full h-96 md:h-[500px] object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  
                  {/* Bottom Info Bar */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-black/80 to-black/60 text-white p-6 rounded-b-3xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">500+ Pets Available</div>
                        <div className="text-xs text-gray-300">New arrivals every week</div>
                      </div>
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold hover:from-yellow-300 hover:to-orange-300 transition-all duration-300 cursor-pointer transform hover:scale-110">
                        Adopt Now
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Pets Section with Scroll Animation */}
      <section 
        id="popular" 
        className="py-20 bg-white"
        data-animate
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible.popular ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Pets</h2>
            <p className="text-xl text-gray-600">Discover the most loved companions</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularPets.map((pet, index) => (
              <div 
                key={pet.id} 
                className={`group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 hover:scale-105 ${
                  isVisible.popular 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-20'
                }`}
                style={{
                  transitionDelay: isVisible.popular ? `${index * 150}ms` : '0ms'
                }}
              >
                <div className="relative overflow-hidden rounded-t-xl">
                  <img 
                    src={pet.image} 
                    alt={pet.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                      {pet.badge}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full">
                    <span className="text-yellow-400 text-sm">★{pet.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                    {pet.name}
                  </h3>
                  <p className="text-gray-600 mb-3">{pet.breed}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-gray-900">{pet.price}</span>
                      <span className="text-sm text-gray-500 line-through">{pet.originalPrice}</span>
                    </div>
                    <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
                      Adopt Me
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div 
            className={`text-center mt-12 transition-all duration-1000 delay-700 ${
              isVisible.popular ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <button className="bg-gray-800 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              View All Popular Pets
            </button>
          </div>
        </div>
      </section>

      {/* Featured Pets Section with Parallax Scroll */}
      <section 
        id="featured" 
        style={{backgroundColor: '#cdcdcd'}} 
        className="py-20"
        data-animate
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible.featured ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Pets</h2>
            <p className="text-xl text-gray-600">Top picks that found loving homes</p>
          </div>
          
          <div className="relative">
            <div className="flex overflow-x-auto space-x-6 pb-6 scrollbar-hide">
              {featuredPets.map((pet, index) => (
                <div 
                  key={pet.id} 
                  className={`flex-none w-64 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 hover:scale-105 ${
                    isVisible.featured 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-20'
                  }`}
                  style={{
                    transitionDelay: isVisible.featured ? `${index * 200}ms` : '0ms'
                  }}
                >
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img 
                      src={pet.image} 
                      alt={pet.name}
                      className="w-full h-72 object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        #{index + 1} Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{pet.name}</h3>
                    <p className="text-gray-600 mb-2">{pet.breed}</p>
                    <p className="text-sm text-green-600 font-medium mb-3">{pet.adoptions}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900">{pet.price}</span>
                      <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-all duration-300 transform hover:scale-105">
                        Adopt Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Staggered Animation */}
      <section 
        id="features" 
        className="py-20 bg-white"
        data-animate
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose PetShop?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing the best pet adoption experience with unmatched quality and care.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`text-center p-8 rounded-xl hover:shadow-xl transition-all duration-700 transform hover:-translate-y-2 hover:scale-105 group ${
                  isVisible.features 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-20'
                }`}
                style={{
                  backgroundColor: '#f8f9fa', 
                  transitionDelay: isVisible.features ? `${index * 100}ms` : '0ms'
                }}
              >
                <div 
                  className={`w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-6 mx-auto transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg ${
                    isVisible.features ? 'animate-bounce' : ''
                  }`}
                  style={{animationDelay: `${index * 200}ms`}}
                >
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">{feature.title}</h3>
                <p className="text-gray-700 leading-relaxed group-hover:text-gray-600 transition-colors">{feature.description}</p>
                
                {/* Decorative line */}
                <div className="w-12 h-1 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full mx-auto mt-4 transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections Section with Scale Animation */}
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
            <p className="text-xl text-gray-600">Find pets and supplies in your favorite categories</p>
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
      <section 
        id="stats"
        className="py-20 bg-gray-800 text-white"
        data-animate
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div 
              className={`transition-all duration-1000 ${
                isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{transitionDelay: '0ms'}}
            >
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-gray-300 text-lg">Pets Available</div>
            </div>
            <div 
              className={`transition-all duration-1000 ${
                isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{transitionDelay: '200ms'}}
            >
              <div className="text-5xl font-bold mb-2">2,000+</div>
              <div className="text-gray-300 text-lg">Happy Families</div>
            </div>
            <div 
              className={`transition-all duration-1000 ${
                isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{transitionDelay: '400ms'}}
            >
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-gray-300 text-lg">Breeds Available</div>
            </div>
            <div 
              className={`transition-all duration-1000 ${
                isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{transitionDelay: '600ms'}}
            >
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-gray-300 text-lg">Pet Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section with Slide Animation */}
      <Reviews />

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Perfect Companion?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of pet lovers who have made PetShop their go-to destination for finding loving companions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Create Account
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced CSS Animations with Scroll Effects */}
      <style>{`
        /* Smooth scrolling for the entire page */
        html {
          scroll-behavior: smooth;
        }

        /* Parallax and scroll animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
          }
        }

        @keyframes bounceSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes flipIn {
          from {
            opacity: 0;
            transform: rotateY(-90deg);
          }
          to {
            opacity: 1;
            transform: rotateY(0);
          }
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.3);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Animation classes */
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out forwards;
        }

        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 3s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-float-slow {
          animation: floatSlow 4s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounceSlow 2s ease-in-out infinite;
        }

        .animate-bounce-delayed {
          animation: bounceSlow 2s ease-in-out infinite;
          animation-delay: 0.5s;
        }

        .animate-scale-in {
          animation: scaleIn 0.8s ease-out forwards;
        }

        .animate-slide-from-left {
          animation: slideInFromLeft 0.8s ease-out forwards;
        }

        .animate-slide-from-right {
          animation: slideInFromRight 0.8s ease-out forwards;
        }

        .animate-flip-in {
          animation: flipIn 0.8s ease-out forwards;
        }

        .animate-zoom-in {
          animation: zoomIn 0.6s ease-out forwards;
        }

        /* Scroll behavior */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Hover effects */
        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }

        .border-3 {
          border-width: 3px;
        }

        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }

        /* Gradient text animation */
        .bg-gradient-to-r {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        /* Custom hover effects */
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }

        /* Backdrop blur effects */
        .backdrop-blur-lg {
          backdrop-filter: blur(16px);
        }

        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
        }

        /* Smooth transitions for all elements */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Scroll progress indicator */
        .scroll-indicator {
          position: fixed;
          top: 0;
          left: 0;
          height: 4px;
          background: linear-gradient(90deg, #f59e0b, #ef4444, #8b5cf6);
          z-index: 1000;
          transition: width 0.3s ease;
        }

        /* Parallax container */
        .parallax-container {
          will-change: transform;
        }

        /* Intersection animation triggers */
        [data-animate] {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Staggered animation delays */
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        .stagger-4 { transition-delay: 0.4s; }
        .stagger-5 { transition-delay: 0.5s; }

        /* Loading states */
        .loading {
          opacity: 0;
          transform: translateY(20px);
        }

        .loaded {
          opacity: 1;
          transform: translateY(0);
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .parallax-container {
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PetShopLanding;