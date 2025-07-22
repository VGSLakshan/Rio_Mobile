import React from "react";
import heroVideoMp4 from "../assets/videos/hero-video.mp4";
import heroVideo2Mp4 from "../assets/videos/hero-video2.mp4";
import s25 from "../assets/images/s25.jpg";

// Sample mobile phone data
const mobilePhones = [
  {
    id: 1,
    name: "Samsung S25 Ultra",
    price: "Rs.264,990.00",
    image: s25,
    specs: ["6.7'' OLED Display", "108MP Camera", "5000mAh Battery", "12GB RAM"],
    colors: ["Black", "Green", "Silver"]
  },
  {
    id: 2,
    name: "Rio Elite",
    price: "$799",
    image: "/images/phone2.jpg",
    specs: ["6.5'' AMOLED", "64MP Camera", "4500mAh Battery", "8GB RAM"],
    colors: ["Green", "Blue", "White"]
  },
  {
    id: 3,
    name: "Rio Lite",
    price: "$499",
    image: "/images/phone3.jpg",
    specs: ["6.1'' LCD", "48MP Camera", "4000mAh Battery", "6GB RAM"],
    colors: ["Black", "Green", "Red"]
  },
  {
    id: 4,
    name: "Rio Max",
    price: "$1199",
    image: "/images/phone4.jpg",
    specs: ["6.8'' OLED", "200MP Camera", "6000mAh Battery", "16GB RAM"],
    colors: ["Titanium", "Green", "Gold"]
  }
];

function HomeMain() {
  // Function to scroll to products section
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
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
              Experience the future of mobile technology with cutting-edge devices
              and innovative solutions that connect you to what matters most.
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
          <div className="animate-bounce cursor-pointer" onClick={scrollToProducts}>
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
      <section id="products-section" className="bg-gradient-to-b from-black to-gray-900 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-6">
              Our Mobile Collection
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our premium range of smartphones designed to elevate your digital experience
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
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="text-6xl text-green-400 absolute inset-0 flex items-center justify-center" style={{display: phone.image ? 'none' : 'flex'}}>
                    📱
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Phone Details */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">{phone.name}</h3>
                    <span className="text-l font-bold text-green-400">{phone.price}</span>
                  </div>

                  {/* Specifications */}
                  <div className="space-y-2">
                    {phone.specs.map((spec, index) => (
                      <div key={index} className="flex items-center text-gray-300 text-sm">
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
                          color === 'Black' ? 'bg-black' :
                          color === 'Green' ? 'bg-green-500' :
                          color === 'Silver' ? 'bg-gray-300' :
                          color === 'Blue' ? 'bg-blue-500' :
                          color === 'White' ? 'bg-white' :
                          color === 'Red' ? 'bg-red-500' :
                          color === 'Titanium' ? 'bg-gray-400' :
                          color === 'Gold' ? 'bg-yellow-500' : 'bg-gray-500'
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
            <button className="bg-gradient-to-r from-green-500 to-green-700 text-white px-10 py-4 rounded-full font-semibold text-lg hover:from-green-600 hover:to-green-800 transform hover:scale-105 transition-all duration-300 shadow-2xl">
              View All Products
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeMain;