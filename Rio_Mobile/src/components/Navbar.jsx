import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import rioLogo from "../assets/images/RIO.png"; 

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const viewportHeight = window.innerHeight;
      const videoSectionHeight = viewportHeight;

      if (scrollTop >= videoSectionHeight - 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);

        const maxScroll = 300;
        const minOpacity = 0.7;
        const opacity = Math.max(
          minOpacity,
          1 - (scrollTop / maxScroll) * (1 - minOpacity)
        );
        setScrollOpacity(opacity);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <nav
      className={`bg-gradient-to-r from-black via-gray-900 to-green-900 shadow-2xl sticky top-0 z-50 backdrop-blur-sm transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
      style={{ opacity: isVisible ? scrollOpacity : 0 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-28 h-15 mr-3 mr-3 transform hover:scale-110 transition-transform duration-300">
                <img
                  src={rioLogo}
                  alt="Rio Mobile Logo"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    // Fallback to "R" if image fails to load
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
              </div>
              
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="/"
                className="text-white hover:text-green-300 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-green-500/20 hover:scale-105 hover:shadow-lg transform"
              >
                Home
              </a>
              <Link
                to="/products"
                className="text-white hover:text-green-300 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-green-500/20 hover:scale-105 hover:shadow-lg transform"
              >
                Products
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-green-300 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-green-500/20 hover:scale-105 hover:shadow-lg transform"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-white hover:text-green-300 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-green-500/20 hover:scale-105 hover:shadow-lg transform"
              >
                Contact
              </Link>
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
      </div>
    </nav>
  );
}

export default Navbar;
