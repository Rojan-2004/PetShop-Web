import React, { useState, useEffect } from 'react';

const LatestCollections = () => {
  const [isVisible, setIsVisible] = useState({});

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

  const latestCollections = [
    {
      id: 1,
      title: "New Arrivals 2025",
      petCount: "150+ Pets",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop",
      description: "Discover the latest pets that just arrived at our shop"
    },
    {
      id: 2,
      title: "Premium Breeds",
      petCount: "85+ Pets",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=400&fit=crop",
      description: "Celebrate excellence with premium breed companions"
    },
    {
      id: 3,
      title: "Trending Now",
      petCount: "120+ Pets",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop",
      description: "The most popular pets everyone is adopting right now"
    }
  ];

  return (
    <section 
      id="latest-collections" 
      className="py-20 bg-gray-100"
      data-animate
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible['latest-collections'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Collections</h2>
          <p className="text-xl text-gray-600">Discover our newest and most exciting pet collections</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {latestCollections.map((collection, index) => (
            <div 
              key={collection.id} 
              className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 hover:scale-105 overflow-hidden ${
                isVisible['latest-collections'] 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-75'
              }`}
              style={{
                transitionDelay: isVisible['latest-collections'] ? `${index * 200}ms` : '0ms'
              }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={collection.image} 
                  alt={collection.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                    {collection.petCount}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                  {collection.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{collection.description}</p>
                <button className="w-full bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
                  Explore Collection
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestCollections;
