import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <a href="/" className="flex items-center gap-3">
            <img 
              src="/images/logo.png" 
              alt="TALAYSAI Logo" 
              className="h-12 w-12 object-contain"
            />
            <span className="text-2xl font-bold text-blue-600">
              TALAYSAI
            </span>
          </a>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Home
            </a>
            <a href="/rooms" className="text-gray-600 hover:text-blue-600 transition-colors">
              Rooms
            </a>
            <a href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
              About
            </a>
            <a href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </a>
            <a
              href="/booking"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Book now
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;