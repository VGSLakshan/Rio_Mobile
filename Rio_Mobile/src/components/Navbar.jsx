import React, { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-green-900 shadow-2xl sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3 shadow-lg transform hover:scale-110 transition-transform duration-300">
                <span className="text-black font-bold text-xl">R</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Rio Mobile
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#"
                className="text-white hover:text-green-300 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-green-500/20 hover:scale-105 hover:shadow-lg transform"
              >
                🏠 Home
              </a>
              <a
                href="#"
                className="text-white hover:text-green-300 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-green-500/20 hover:scale-105 hover:shadow-lg transform"
              >
                📱 Products
              </a>
              <a
                href="#"
                className="text-white hover:text-green-300 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-green-500/20 hover:scale-105 hover:shadow-lg transform"
              >
                ℹ️ About
              </a>
              <a
                href="#"
                className="text-white hover:text-green-300 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-green-500/20 hover:scale-105 hover:shadow-lg transform"
              >
                📞 Contact
              </a>
              <button className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2 rounded-full font-semibold hover:from-green-600 hover:to-green-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Get Started
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-green-300 focus:outline-none focus:text-green-300 transition-colors duration-300"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/20 rounded-lg backdrop-blur-sm mt-2">
              <a
                href="#"
                className="text-white hover:text-green-300 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
              >
                🏠 Home
              </a>
              <a
                href="#"
                className="text-white hover:text-green-300 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
              >
                📱 Products
              </a>
              <a
                href="#"
                className="text-white hover:text-green-300 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
              >
                ℹ️ About
              </a>
              <a
                href="#"
                className="text-white hover:text-green-300 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
              >
                📞 Contact
              </a>
              <button className="w-full mt-2 bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded-full font-semibold hover:from-green-600 hover:to-green-800 transition-all duration-300">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
