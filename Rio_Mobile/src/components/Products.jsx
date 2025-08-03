import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import "animate.css";
import Footer from "./Footer";
import pro1 from "../assets/videos/pro1.mp4";
import pro2 from "../assets/videos/pro2.mp4";
import pro3 from "../assets/videos/pro3.mp4";
import pro4 from "../assets/videos/pro4.mp4";
import pro5 from "../assets/videos/pro5.mp4";
import pro6 from "../assets/videos/pro6.mp4";
import rioLogo from "../assets/images/RIO.png";

function Products() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);

  // Array of video sources
  const videoSources = [pro1, pro2, pro3, pro4, pro5, pro6];

  // Handle video ended event to play next video
  const handleVideoEnded = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === videoSources.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Update video source when currentVideoIndex changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videoSources[currentVideoIndex];
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [currentVideoIndex]);

  // Fetch products from database
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const result = await response.json();

      if (result.success) {
        setProducts(result.data);
        console.log("📦 Products loaded from database:", result.data.length);
      } else {
        setError("Failed to load products");
        console.error("Failed to fetch products:", result.message);
      }
    } catch (error) {
      setError("Failed to connect to server");
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  // Load products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = [
    { id: "all", name: "All Products", icon: "🏪" },
    { id: "mobile_phone", name: "Mobile Phones", icon: "📱" },
    { id: "accessories", name: "Accessories", icon: "🎧" },
    { id: "bluetooth_speaker", name: "Bluetooth Speakers", icon: "🔊" },
    { id: "jbl_party_box", name: "JBL PartyBox", icon: "🎉" },
  ];

  // Format price for display
  const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case "mobile_phone":
        return "📱";
      case "accessories":
        return "🎧";
      case "bluetooth_speaker":
        return "🔊";
      case "jbl_party_box":
        return "🎉";
      default:
        return "📦";
    }
  };

  // Filter products based on active category
  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  // Get featured products (first 4 products)
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900">
      <Navbar />

      {/* Hero Section with Background Video */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
        >
          <source src={videoSources[currentVideoIndex]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-10"></div>
        {/* Bottom Black Fade */}
        <div className="absolute bottom-0 left-0 w-full h-60 bg-gradient-to-t from-black to-via-gray-900 z-20 pointer-events-none"></div>

        {/* Header Content */}
        <div className="relative z-20 text-center">
          {/* CSS for looping animation */}
          <style jsx>{`
            @keyframes slideUpLoop {
              0% {
                transform: translateY(120vh);
                opacity: 0;
              }
              3% {
                opacity: 1;
              }
              97% {
                opacity: 1;
              }
              100% {
                transform: translateY(-120vh);
                opacity: 0;
              }
            }

            .animate-set-1 {
              animation: slideUpLoop 12s linear infinite;
              animation-delay: 0s;
            }
          `}</style>

          {/* First Set - Rio Logo to Mobile Accessories */}
          <div className="animate-set-1">
            <div className="w-120 h-65 bg-gradient-to-r from-green-0 to-green-0 rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl">
              <img
                src={rioLogo}
                alt="Rio Mobile Logo"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  // Fallback to "R" if image fails to load
                  e.target.style.display = "none";
                  e.target.nextElementSibling.style.display = "flex";
                }}
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-4">
              Our Products
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Discover our complete range of mobile phones, accessories,
              speakers, and more
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              What We Offer
            </h2>

            <ul className="space-y-6 text-left text-gray-300 text-lg max-w-4xl mx-auto">
              {/* Product 1 */}
              <li className="mb-6">
                <span className="text-green-400 font-semibold text-xl block mb-2">
                  📱 SmartPhones
                </span>
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  <li>
                    Latest Android and iOS models with blazing fast performance.
                  </li>
                  <li>
                    Long-lasting battery life and high-refresh-rate displays.
                  </li>
                  <li>
                    Best-in-class camera systems for pro-level photography.
                  </li>
                  <li>
                    Warranty & after-sales support included with every device.
                  </li>
                </ul>
              </li>

              {/* Product 2 */}
              <li className="mb-6">
                <span className="text-green-400 font-semibold text-xl block mb-2">
                  🎧 Audio Accessories
                </span>
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  <li>Noise-canceling wireless headphones and earbuds.</li>
                  <li>Powerful Bluetooth speakers with deep bass.</li>
                  <li>
                    Perfect for travel, workouts, or immersive movie nights.
                  </li>
                </ul>
              </li>

              {/* Product 3 */}
              <li className="mb-6">
                <span className="text-green-400 font-semibold text-xl block mb-2">
                  🔌 Mobile Accessories
                </span>
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  <li>
                    Fast chargers, power banks, cables, and magnetic mounts.
                  </li>
                  <li>
                    Engineered for safety, durability, and fast performance.
                  </li>
                  <li>Universal compatibility with all major devices.</li>
                </ul>
              </li>
            </ul>
            <ul className="space-y-6 text-left text-gray-300 text-lg max-w-4xl mx-auto">
              {/* Product 4 */}
              <li className="mb-6">
                <span className="text-green-400 font-semibold text-xl block mb-2">
                  🧩 Smart Gadgets
                </span>
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  <li>Smart watches, fitness trackers, and IoT gadgets.</li>
                  <li>
                    Track your health, steps, sleep, and get notifications on
                    the go.
                  </li>
                  <li>
                    Stylish and functional for both tech lovers and casual
                    users.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-gradient-to-br from-black via-gray-900 to-green-900">
        <div className="container mx-auto px-4 py-12">
          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400 text-lg">
                Loading products from database...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-400 text-2xl">⚠️</span>
              </div>
              <p className="text-red-400 text-lg mb-4">{error}</p>
              <button
                onClick={fetchProducts}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-green-500/20 group relative h-80"
                >
                  {/* Product Image - Always Visible */}
                  <div className="relative w-full h-full">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextElementSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className="text-8xl text-green-400 absolute inset-0 flex items-center justify-center bg-gray-700"
                      style={{
                        display: product.image ? "none" : "flex",
                      }}
                    >
                      {getCategoryIcon(product.category)}
                    </div>

                    {/* Out of Stock Overlay - Always Visible if Out of Stock */}
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                        <span className="text-red-400 font-bold text-lg bg-black/60 px-4 py-2 rounded-lg">
                          Out of Stock
                        </span>
                      </div>
                    )}

                    {/* Hover Overlay with Details */}
                    <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-6">
                      {/* Product Details */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-bold text-white mb-1">
                              {product.name}
                            </h3>
                            {product.brand && (
                              <p className="text-gray-300 text-sm">
                                {product.brand}
                              </p>
                            )}
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              product.stock > 0
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {product.stock > 0
                              ? `${product.stock} in stock`
                              : "Out of Stock"}
                          </span>
                        </div>

                        {/* Category */}
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">
                            {getCategoryIcon(product.category)}
                          </span>
                          <span className="text-gray-300 text-sm capitalize">
                            {product.category.replace("_", " ")}
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-green-400">
                            {formatPrice(product.price)}
                          </span>
                        </div>

                        {/* Specifications for Mobile Phones */}
                        {product.category === "mobile_phone" && (
                          <div className="space-y-1">
                            {product.ram && (
                              <div className="flex items-center text-gray-300 text-sm">
                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
                                RAM: {product.ram}
                              </div>
                            )}
                            {product.storage && (
                              <div className="flex items-center text-gray-300 text-sm">
                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
                                Storage: {product.storage}
                              </div>
                            )}
                            <div className="flex items-center text-gray-300 text-sm">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
                              Color: {product.color}
                            </div>
                          </div>
                        )}

                        {/* Description */}
                        {product.description && (
                          <p className="text-gray-300 text-sm line-clamp-3">
                            {product.description}
                          </p>
                        )}
                      </div>

                      {/* Contact WhatsApp Button */}
                      <div className="pt-4">
                        <button
                          disabled={product.stock === 0}
                          onClick={() => {
                            const phoneNumber = "94764845882";
                            const message = `Hello Rio Mobile! I'm interested in ${
                              product.name
                            } (${formatPrice(
                              product.price
                            )}). Is it available?`;
                            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                              message
                            )}`;
                            window.open(whatsappUrl, "_blank");
                          }}
                          className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 ${
                            product.stock > 0
                              ? "bg-gradient-to-r from-green-500 to-green-700 text-white hover:from-green-600 hover:to-green-800"
                              : "bg-gray-600 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.905 3.488" />
                          </svg>
                          <span>
                            {product.stock > 0 ? "Contact Us" : "Unavailable"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Products Message */}
          {!loading && !error && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-400 text-2xl">📦</span>
              </div>
              <p className="text-gray-400 text-lg">
                No products found in this category
              </p>
              <button
                onClick={() => setActiveCategory("all")}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                View All Products
              </button>
            </div>
          )}

          {/* Contact CTA */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-green-500/20 to-green-700/20 rounded-2xl p-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                Need Help Choosing?
              </h3>
              <p className="text-gray-300 mb-6">
                Our experts are here to help you find the perfect product for
                your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-gradient-to-r from-green-500 to-green-700 text-white px-8 py-4 rounded-full font-semibold hover:from-green-600 hover:to-green-800 transform hover:scale-105 transition-all duration-300"
                >
                  Contact Us
                </Link>
                <button
                  onClick={() => {
                    const phoneNumber = "94764845882";
                    const message =
                      "Hello Rio Mobile! I need help choosing the right product. Can you assist me?";
                    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                      message
                    )}`;
                    window.open(whatsappUrl, "_blank");
                  }}
                  className="border-2 border-green-500 text-green-400 px-8 py-4 rounded-full font-semibold hover:bg-green-500 hover:text-black transform hover:scale-105 transition-all duration-300"
                >
                  WhatsApp Us
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Products;
