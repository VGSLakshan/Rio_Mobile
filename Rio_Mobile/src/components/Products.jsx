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
                  className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-green-500/20 group"
                >
                  {/* Product Image */}
                  <div className="bg-gray-700 rounded-xl h-48 mb-4 flex items-center justify-center relative overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-xl hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextElementSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className="text-4xl text-green-400 absolute inset-0 flex items-center justify-center"
                      style={{
                        display: product.image ? "none" : "flex",
                      }}
                    >
                      {getCategoryIcon(product.category)}
                    </div>

                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-xl">
                        <span className="text-red-400 font-bold text-sm">
                          Out of Stock
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">
                          {product.name}
                        </h3>
                        {product.brand && (
                          <p className="text-gray-400 text-xs">
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
                      <span className="text-gray-400 text-xs capitalize">
                        {product.category.replace("_", " ")}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-green-400">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    {/* Specifications for Mobile Phones */}
                    {product.category === "mobile_phone" && (
                      <div className="space-y-1">
                        {product.ram && (
                          <div className="flex items-center text-gray-300 text-xs">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
                            RAM: {product.ram}
                          </div>
                        )}
                        {product.storage && (
                          <div className="flex items-center text-gray-300 text-xs">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
                            Storage: {product.storage}
                          </div>
                        )}
                        <div className="flex items-center text-gray-300 text-xs">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
                          Color: {product.color}
                        </div>
                      </div>
                    )}

                    {/* Description */}
                    {product.description && (
                      <p className="text-gray-400 text-xs line-clamp-2">
                        {product.description}
                      </p>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-3">
                      <button
                        disabled={product.stock === 0}
                        onClick={() => {
                          const phoneNumber = "94764845882";
                          const message = `Hello Rio Mobile! I'm interested in ${
                            product.name
                          } (${formatPrice(product.price)}). Is it available?`;
                          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                            message
                          )}`;
                          window.open(whatsappUrl, "_blank");
                        }}
                        className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                          product.stock > 0
                            ? "bg-gradient-to-r from-green-500 to-green-700 text-white hover:from-green-600 hover:to-green-800"
                            : "bg-gray-600 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {product.stock > 0 ? "Order Now" : "Unavailable"}
                      </button>
                      <button
                        onClick={() => {
                          Swal.fire({
                            title: `<span style="font-size: 1.5rem; font-weight: bold; color: #22c55e;">${product.name}</span>`,
                            html: `
        <div style="text-align: left; font-size: 1rem; color: #ccc;">
          <p><strong>📦 Brand:</strong> ${product.brand || "N/A"}</p>
          <p><strong>💵 Price:</strong> ${formatPrice(product.price)}</p>
          <p><strong>📦 Stock:</strong> ${
            product.stock > 0
              ? `<span style="color: #22c55e">${product.stock} units</span>`
              : `<span style="color: #f87171">Out of stock</span>`
          }</p>
          <p><strong>📂 Category:</strong> ${product.category.replace(
            "_",
            " "
          )}</p>
          <p><strong>📝 Description:</strong> ${
            product.description || "No description available"
          }</p>
        </div>
      `,
                            icon: "info",
                            background: "#1f2937", // Tailwind bg-gray-800
                            color: "#f3f4f6", // Tailwind text-gray-100
                            iconColor: "#22c55e", // Tailwind green-500
                            confirmButtonColor: "#22c55e", // Tailwind green-500
                            confirmButtonText: "Close",
                            customClass: {
                              popup: "rounded-xl p-6",
                              title: "text-white",
                            },
                            showClass: {
                              popup: "animate__animated animate__fadeInDown",
                            },
                            hideClass: {
                              popup: "animate__animated animate__fadeOutUp",
                            },
                          });
                        }}
                        className="flex-1 border border-green-500 text-green-400 py-2 rounded-lg text-sm font-semibold hover:bg-green-500 hover:text-black transition-all duration-300"
                      >
                        Details
                      </button>
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
