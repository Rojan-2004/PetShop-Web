import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-orange-100 text-[#8B4513] py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">Pet Shop</h3>
          <p className="text-sm">
            Your one-stop shop for all your pet needs. Trusted by pet lovers across the country.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-orange-500">Home</a></li>
            <li><a href="/shop" className="hover:text-orange-500">Shop</a></li>
            <li><a href="/about" className="hover:text-orange-500">About Us</a></li>
            <li><a href="/contact" className="hover:text-orange-500">Contact</a></li>
          </ul>
        </div>

        {/* Help & Support */}
        <div>
          <h4 className="font-semibold mb-4">Help</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/faq" className="hover:text-orange-500">FAQ</a></li>
            <li><a href="/returns" className="hover:text-orange-500">Return Policy</a></li>
            <li><a href="/shipping" className="hover:text-orange-500">Shipping Info</a></li>
            <li><a href="/support" className="hover:text-orange-500">Support</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-semibold mb-4">Stay Connected</h4>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-orange-500"><FaFacebook /></a>
            <a href="#" className="hover:text-orange-500"><FaInstagram /></a>
            <a href="#" className="hover:text-orange-500"><FaTwitter /></a>
            <a href="mailto:info@petshop.com" className="hover:text-orange-500"><FaEnvelope /></a>
          </div>
          <p className="mt-4 text-sm">Email: info@petshop.com</p>
          <p className="text-sm">Phone: +1 234 567 890</p>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-xs text-brown-600 mt-10">
        &copy; {new Date().getFullYear()} Pet Shop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
