import React from "react";
import { Link } from "react-router-dom";
import heroVideo2Mp4 from "../assets/videos/hero-video2.mp4";
import s25 from "../assets/images/s25.jpg";
import i16  from "../assets/images/i16.jpg";
import R13pro from "../assets/images/R13pro.jpg";

// Sample mobile phone data
const mobilePhones = [
  {
    id: 1,
    name: "Samsung S25 Ultra",
    price: "Rs.264,990.00",
    image: s25,
    specs: [
      "6.7'' OLED Display",
      "108MP Camera",
      "5000mAh Battery",
      "12GB RAM",
    ],
    colors: ["Black", "Titanium Silver Blue", "Silver"],
  },
  {
    id: 2,
    name: "I phone 16 pro",
    price: "Rs 318,000.00",
    image: i16,
    specs: ["6.5'' AMOLED", "64MP Camera", "4500mAh Battery", "8GB RAM"],
    colors: ["Green", "Blue", "White"],
  },
  {
    id: 3,
    name: "Xiaomi Redmi Note 13 Pro+",
    price: "Rs.81,990.00",
    image: R13pro,
    specs: ["6.1'' LCD", "48MP Camera", "4000mAh Battery", "6GB RAM"],
    colors: ["Black", "Green", "Red"],
  },
  {
    id: 4,
    name: "Rio Max",
    price: "$1199",
    image: "/images/phone4.jpg",
    specs: ["6.8'' OLED", "200MP Camera", "6000mAh Battery", "16GB RAM"],
    colors: ["Titanium", "Green", "Gold"],
  },
];

function HomeMain() {
  // Function to scroll to products section
  const scrollToProducts = () => {
    const productsSection = document.getElementById("products-section");
    if (productsSection) {
      productsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // WhatsApp chat function
  const openWhatsAppChat = () => {
    const phoneNumber = "94764845882"; // Your phone number with country code (94 for Sri Lanka)
    const message =
      "Hello Rio Mobile! I'm interested in your services. Can you help me?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <section className="relative h-screen w-full overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={heroVideo2Mp4} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

        {/* Content */}
        <div className="relative z-20 flex items-center justify-center h-full">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Rio Mobile
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
              Experience the future of mobile technology with cutting-edge
              devices and innovative solutions that connect you to what matters
              most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToProducts}
                className="bg-gradient-to-r from-green-500 to-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-green-600 hover:to-green-800 transform hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                Explore Products
              </button>
              <button className="border-2 border-green-500 text-green-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-500 hover:text-black transform hover:scale-105 transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div
            className="animate-bounce cursor-pointer"
            onClick={scrollToProducts}
          >
            <svg
              className="w-6 h-6 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section
        id="products-section"
        className="bg-gradient-to-b from-black to-gray-900 py-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-6">
              Our Mobile Collection
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our premium range of smartphones designed to elevate your
              digital experience
            </p>
          </div>

          {/* Mobile Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mobilePhones.map((phone) => (
              <div
                key={phone.id}
                className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-green-500/20 group"
              >
                {/* Phone Image */}
                <div className="bg-gray-700 rounded-xl h-64 mb-6 flex items-center justify-center relative overflow-hidden">
                  {phone.image ? (
                    <img
                      src={phone.image}
                      alt={phone.name}
                      className="w-full h-full object-cover rounded-xl hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        // Fallback to emoji if image fails to load
                        e.target.style.display = "none";
                        e.target.nextElementSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="text-6xl text-green-400 absolute inset-0 flex items-center justify-center"
                    style={{ display: phone.image ? "none" : "flex" }}
                  >
                    📱
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Phone Details */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">
                      {phone.name}
                    </h3>
                    <span className="text-l font-bold text-green-400">
                      {phone.price}
                    </span>
                  </div>

                  {/* Specifications */}
                  <div className="space-y-2">
                    {phone.specs.map((spec, index) => (
                      <div
                        key={index}
                        className="flex items-center text-gray-300 text-sm"
                      >
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                        {spec}
                      </div>
                    ))}
                  </div>

                  {/* Color Options */}
                  <div className="flex space-x-2">
                    {phone.colors.map((color, index) => (
                      <div
                        key={index}
                        className={`w-6 h-6 rounded-full border-2 border-gray-600 cursor-pointer hover:scale-110 transition-transform ${
                          color === "Black"
                            ? "bg-black"
                            : color === "Titanium Silver Blue"
                            ? "bg-[#7A9BAE]"
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

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <button className="flex-1 bg-gradient-to-r from-green-500 to-green-700 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-800 transition-all duration-300 transform hover:scale-105">
                      Buy Now
                    </button>
                    <button className="flex-1 border border-green-500 text-green-400 py-3 rounded-xl font-semibold hover:bg-green-500 hover:text-black transition-all duration-300">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="bg-gradient-to-r from-green-500 to-green-700 text-white px-10 py-4 rounded-full font-semibold text-lg hover:from-green-600 hover:to-green-800 transform hover:scale-105 transition-all duration-300 shadow-2xl inline-block"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={openWhatsAppChat}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 animate-bounce hover:animate-none group"
          title="Chat with us on WhatsApp"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.905 3.488" />
          </svg>

          {/* Chat tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Chat with us on WhatsApp
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
          </div>
        </button>
      </div>
    </>
  );
}

export default HomeMain;
