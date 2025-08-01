import React, { useState } from "react";
import { Link } from "react-router-dom";
import s25 from "../assets/images/s25.jpg";
import Navbar from "./Navbar";

function Products() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Products", icon: "🏪" },
    { id: "mobiles", name: "Mobile Phones", icon: "📱" },
    { id: "accessories", name: "Accessories", icon: "🎧" },
    { id: "speakers", name: "Bluetooth Speakers", icon: "🔊" },
    { id: "jbl", name: "JBL PartyBox", icon: "🎉" },
  ];

  const products = [
    // Mobile Phones
    {
      id: 1,
      name: "Samsung S25 Ultra",
      category: "mobiles",
      price: "Rs.264,990.00",
      originalPrice: "Rs.280,000.00",
      image: s25,
      rating: 4.8,
      reviews: 124,
      specs: [
        "6.7'' OLED Display",
        "108MP Camera",
        "5000mAh Battery",
        "12GB RAM",
      ],
      colors: ["Black", "Green", "Silver"],
      inStock: true,
      featured: true,
    },
    {
      id: 2,
      name: "iPhone 15 Pro",
      category: "mobiles",
      price: "Rs.380,000.00",
      image: "/images/iphone15.jpg",
      rating: 4.9,
      reviews: 89,
      specs: [
        "6.1'' Super Retina",
        "48MP Camera",
        "4422mAh Battery",
        "8GB RAM",
      ],
      colors: ["Titanium", "Blue", "White", "Black"],
      inStock: true,
      featured: true,
    },
    {
      id: 3,
      name: "OnePlus 12",
      category: "mobiles",
      price: "Rs.185,000.00",
      image: "/images/oneplus12.jpg",
      rating: 4.7,
      reviews: 67,
      specs: ["6.82'' AMOLED", "50MP Camera", "5400mAh Battery", "16GB RAM"],
      colors: ["Green", "Black", "White"],
      inStock: true,
    },

    // Accessories
    {
      id: 4,
      name: "AirPods Pro 2",
      category: "accessories",
      price: "Rs.65,000.00",
      image: "/images/airpods.jpg",
      rating: 4.6,
      reviews: 203,
      specs: [
        "Active Noise Cancellation",
        "6 Hours Battery",
        "Wireless Charging",
        "Spatial Audio",
      ],
      inStock: true,
      featured: true,
    },
    {
      id: 5,
      name: "Samsung Galaxy Watch 6",
      category: "accessories",
      price: "Rs.89,000.00",
      image: "/images/watch.jpg",
      rating: 4.5,
      reviews: 156,
      specs: ["1.5'' AMOLED", "Health Monitoring", "GPS", "40mm Case"],
      colors: ["Black", "Silver", "Gold"],
      inStock: true,
    },
    {
      id: 6,
      name: "Wireless Charger Stand",
      category: "accessories",
      price: "Rs.8,500.00",
      image: "/images/charger.jpg",
      rating: 4.3,
      reviews: 78,
      specs: [
        "15W Fast Charging",
        "LED Indicator",
        "Universal Compatible",
        "Anti-Slip",
      ],
      inStock: true,
    },

    // Bluetooth Speakers
    {
      id: 7,
      name: "JBL Flip 6",
      category: "speakers",
      price: "Rs.35,000.00",
      image: "/images/jbl-flip6.jpg",
      rating: 4.7,
      reviews: 189,
      specs: [
        "12 Hours Playtime",
        "Waterproof IP67",
        "Bluetooth 5.1",
        "20W Output",
      ],
      colors: ["Black", "Blue", "Red", "Green"],
      inStock: true,
      featured: true,
    },
    {
      id: 8,
      name: "Sony SRS-XB43",
      category: "speakers",
      price: "Rs.42,000.00",
      image: "/images/sony-speaker.jpg",
      rating: 4.4,
      reviews: 145,
      specs: [
        "24 Hours Battery",
        "Extra Bass",
        "LED Lighting",
        "Water Resistant",
      ],
      inStock: true,
    },

    // JBL PartyBox
    {
      id: 9,
      name: "JBL PartyBox 310",
      category: "jbl",
      price: "Rs.125,000.00",
      originalPrice: "Rs.140,000.00",
      image: "/images/partybox310.jpg",
      rating: 4.8,
      reviews: 92,
      specs: ["240W Output", "Light Show", "Karaoke Mode", "18 Hours Battery"],
      inStock: true,
      featured: true,
    },
    {
      id: 10,
      name: "JBL PartyBox 110",
      category: "jbl",
      price: "Rs.89,000.00",
      image: "/images/partybox110.jpg",
      rating: 4.6,
      reviews: 134,
      specs: [
        "160W Output",
        "Dynamic Light",
        "Wireless Mic",
        "12 Hours Battery",
      ],
      inStock: true,
    },
    {
      id: 11,
      name: "JBL PartyBox 1000",
      category: "jbl",
      price: "Rs.285,000.00",
      image: "/images/partybox1000.jpg",
      rating: 4.9,
      reviews: 67,
      specs: ["1100W Output", "Full Panel Lights", "DJ Launchpad", "AC Power"],
      inStock: false,
    },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  const featuredProducts = products.filter((product) => product.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900">
      <Navbar />
      <div className="container mx-auto px-4 pt-8">
      
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-black font-bold text-3xl">🏪</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-4">
            Our Products
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our complete range of mobile phones, accessories, speakers,
            and more
          </p>
        </div>

        {/* Featured Products Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            ⭐ Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-green-500/30"
              >
                <div className="bg-gray-700 rounded-xl h-48 mb-4 flex items-center justify-center relative overflow-hidden">
                  {product.image &&
                  product.image !== "/images/placeholder.jpg" ? (
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
                      display:
                        product.image &&
                        product.image !== "/images/placeholder.jpg"
                          ? "none"
                          : "flex",
                    }}
                  >
                    {categories.find((cat) => cat.id === product.category)
                      ?.icon || "📦"}
                  </div>
                  {product.featured && (
                    <div className="absolute top-2 left-2 bg-green-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                      FEATURED
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 text-sm">
                    {"★".repeat(Math.floor(product.rating))}
                  </div>
                  <span className="text-gray-400 text-sm ml-2">
                    ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-green-400">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-gray-500 line-through ml-2">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      product.inStock
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-green-500/20 group"
            >
              {/* Product Image */}
              <div className="bg-gray-700 rounded-xl h-64 mb-6 flex items-center justify-center relative overflow-hidden">
                {product.image &&
                product.image !== "/images/placeholder.jpg" ? (
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
                  className="text-6xl text-green-400 absolute inset-0 flex items-center justify-center"
                  style={{
                    display:
                      product.image &&
                      product.image !== "/images/placeholder.jpg"
                        ? "none"
                        : "flex",
                  }}
                >
                  {categories.find((cat) => cat.id === product.category)
                    ?.icon || "📦"}
                </div>

                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-xl">
                    <span className="text-red-400 font-bold text-lg">
                      Out of Stock
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Product Details */}
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-white">
                    {product.name}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      product.inStock
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {"★".repeat(Math.floor(product.rating))}
                    {"☆".repeat(5 - Math.floor(product.rating))}
                  </div>
                  <span className="text-gray-400 text-sm">
                    ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-green-400">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Specifications */}
                <div className="space-y-2">
                  {product.specs.slice(0, 3).map((spec, index) => (
                    <div
                      key={index}
                      className="flex items-center text-gray-300 text-sm"
                    >
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      {spec}
                    </div>
                  ))}
                </div>

                {/* Colors */}
                {product.colors && (
                  <div className="flex space-x-2">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className={`w-6 h-6 rounded-full border-2 border-gray-600 cursor-pointer hover:scale-110 transition-transform ${
                          color === "Black"
                            ? "bg-black"
                            : color === "Green"
                            ? "bg-green-500"
                            : color === "Silver"
                            ? "bg-gray-300"
                            : color === "Blue"
                            ? "bg-blue-500"
                            : color === "White"
                            ? "bg-white"
                            : color === "Red"
                            ? "bg-red-500"
                            : color === "Titanium"
                            ? "bg-gray-400"
                            : color === "Gold"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                        }`}
                        title={color}
                      ></div>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    disabled={!product.inStock}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      product.inStock
                        ? "bg-gradient-to-r from-green-500 to-green-700 text-white hover:from-green-600 hover:to-green-800"
                        : "bg-gray-600 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {product.inStock ? "Buy Now" : "Unavailable"}
                  </button>
                  <button className="flex-1 border border-green-500 text-green-400 py-3 rounded-xl font-semibold hover:bg-green-500 hover:text-black transition-all duration-300">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-500/20 to-green-700/20 rounded-2xl p-8">
            <h3 className="text-3xl font-bold text-white mb-4">
              Need Help Choosing?
            </h3>
            <p className="text-gray-300 mb-6">
              Our experts are here to help you find the perfect product for your
              needs.
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
    </div>
  );
}

export default Products;
