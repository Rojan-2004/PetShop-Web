import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// These components are not provided, so we'll create simple mock versions
// to ensure the dashboard compiles and can be previewed.
const FeaturedProducts = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 my-8">
    <h2 className="text-xl font-semibold text-gray-900 mb-6">Featured Products</h2>
    <p className="text-gray-600">This is a placeholder for a list of featured products.</p>
  </div>
);

const CustomerTestimonials = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 my-8">
    <h2 className="text-xl font-semibold text-gray-900 mb-6">Customer Testimonials</h2>
    <p className="text-gray-600">This is a placeholder for customer reviews or testimonials.</p>
  </div>
);

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    revenue: 0
  });

  // Mock data - rebranded for a pet shop. Replace with actual API calls.
  useEffect(() => {
    // Simulate API call to fetch pet shop stats
    setStats({
      totalProducts: 215, // Rebranded from totalBooks
      totalUsers: 1240,
      totalOrders: 312,
      revenue: 78550
    });
  }, []);

  const quickActions = [
    {
      title: 'Manage Products',
      description: 'Add or edit products in your inventory',
      icon: '🐾', // Changed from '📚'
      link: '/admin/products', // Changed from '/admin/books'
      color: 'bg-orange-50 hover:bg-orange-100 border-orange-200' // Rebranded color
    },
    {
      title: 'Manage Orders',
      description: 'View and process customer orders',
      icon: '📦',
      link: '/admin/orders',
      color: 'bg-teal-50 hover:bg-teal-100 border-teal-200' // Rebranded color
    },
    {
      title: 'User Management',
      description: 'Manage pet owner accounts',
      icon: '👥',
      link: '/admin/users',
      color: 'bg-violet-50 hover:bg-violet-100 border-violet-200' // Rebranded color
    },
    {
      title: 'Analytics',
      description: 'View detailed business reports',
      icon: '📊',
      link: '/admin',
      color: 'bg-lime-50 hover:bg-lime-100 border-lime-200' // Rebranded color
    }
  ];

  const recentActivities = [
    { action: 'New order received', details: 'Order #1345 - $45.00', time: '5 minutes ago', type: 'order' },
    { action: 'Product added', details: 'Deluxe Cat Tree added to inventory', time: '20 minutes ago', type: 'product' }, // Rebranded text
    { action: 'User registered', details: 'sarah.jones@email.com joined', time: '1 hour ago', type: 'user' },
    { action: 'Order completed', details: 'Order #1340 delivered successfully', time: '2 hours ago', type: 'order' },
    { action: 'Product updated', details: 'Premium Dog Food - Price updated', time: '3 hours ago', type: 'product' } // Rebranded text
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Welcome Section */}
        <div className="mb-8 bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">PetShop Admin Dashboard 🐾</h1>
              <p className="text-gray-200 text-lg mb-4">
                Manage your pet shop efficiently with these powerful tools and insights.
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-100">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-green-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  System Online
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  Last updated: Today
                </span>
              </div>
            </div>
            <div className="mt-6 md:mt-0 flex flex-col sm:flex-row gap-3">
              <Link 
                to="/admin/products" // Changed link
                className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93h2c0 3.31 2.69 6 6 6v2.93zM18.36 17c-1.42 1.42-3.27 2.29-5.36 2.58V17h2c1.38 0 2.5-1.12 2.5-2.5S15.38 12 14 12v-2h-4v-2c0-2.21-1.79-4-4-4V2c3.95.49 7 3.85 7 7.93h-2c0-3.31-2.69-6-6-6V2.07c3.95.49 7 3.85 7 7.93h2c0 1.38 1.12 2.5 2.5 2.5s2.5 1.12 2.5 2.5c0 1.38-1.12 2.5-2.5 2.5h-2z"/>
                </svg>
                Manage Products
              </Link>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors inline-flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                </svg>
                View Reports
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Products</p> {/* Rebranded text */}
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 text-xl">🐾</span> {/* Rebranded icon */}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <span className="text-teal-600 text-xl">👥</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center">
                <span className="text-violet-600 text-xl">📦</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${stats.revenue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-lime-100 rounded-lg flex items-center justify-center">
                <span className="text-lime-600 text-xl">💰</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.link}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${action.color}`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{action.icon}</span>
                      <div>
                        <h3 className="font-medium text-gray-900">{action.title}</h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activities</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                      activity.type === 'order' ? 'bg-teal-100 text-teal-600' :
                      activity.type === 'product' ? 'bg-orange-100 text-orange-600' :
                      'bg-violet-100 text-violet-600'
                    }`}>
                      {/* Rebranded icons for recent activities */}
                      {activity.type === 'order' ? '📦' : activity.type === 'product' ? '🐾' : '👤'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-600 truncate">{activity.details}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link 
                  to="/admin/activities" 
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  View all activities →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">35</div>
              <div className="text-sm text-gray-600">Orders Today</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-2">22</div>
              <div className="text-sm text-gray-600">New Users This Week</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-violet-600 mb-2">98%</div>
              <div className="text-sm text-gray-600">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Rebranded sections from book-themed components */}
      <FeaturedProducts />
      <CustomerTestimonials />

      {/* Admin Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-amber-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-4">
              PetShop Insights & Updates 🐾
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Stay informed about platform updates, sales analytics, and business insights to grow your pet shop.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter admin email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
            
            <p className="text-sm text-white/70 mt-4">
              Join 500+ admins who stay ahead with business insights. Unsubscribe anytime.
            </p>
            
            {/* Admin Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-1">Sales Analytics</h3>
                <p className="text-sm text-white/80">Weekly performance reports</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-1">Platform Updates</h3>
                <p className="text-sm text-white/80">New features and improvements</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-1">Best Practices</h3>
                <p className="text-sm text-white/80">Tips to optimize your business</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminHome;
