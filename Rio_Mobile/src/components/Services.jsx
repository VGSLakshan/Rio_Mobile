import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import rep1 from "../assets/videos/rep1.mp4";
import rep2 from "../assets/videos/rep2.mp4";
import rep3 from "../assets/videos/rep3.mp4";

function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);

  // Array of video sources
  const videoSources = [rep1, rep2, rep3];

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

  const services = [
    {
      id: 1,
      title: "Phone Repairment",
      icon: "📱",
      description:
        "Complete mobile phone repair services for all brands and models",
      features: [
        "Screen replacement and repair",
        "Battery replacement",
        "Charging port repair",
        "Speaker and microphone repair",
        "Water damage restoration",
        "Software troubleshooting",
        "Hardware diagnostics",
        "Performance optimization",
      ],
      pricing: "Starting from Rs. 2,500",
      duration: "30 minutes - 2 hours",
      warranty: "3 months warranty",
      image: "/images/phone-repair.jpg",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Camera Repairment",
      icon: "📷",
      description:
        "Professional camera repair services for smartphones and devices",
      features: [
        "Front camera replacement",
        "Rear camera replacement",
        "Camera lens repair",
        "Focus mechanism repair",
        "Flash repair",
        "Image stabilization fix",
        "Camera software calibration",
        "Multi-camera system repair",
      ],
      pricing: "Starting from Rs. 3,500",
      duration: "45 minutes - 3 hours",
      warranty: "6 months warranty",
      image: "/images/camera-repair.jpg",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      title: "Board Repairment",
      icon: "🔧",
      description: "Advanced motherboard and circuit repair services",
      features: [
        "Motherboard diagnostics",
        "IC chip replacement",
        "Circuit board repair",
        "Power management repair",
        "Boot loop fixes",
        "Dead phone revival",
        "Component-level repair",
        "Micro-soldering services",
      ],
      pricing: "Starting from Rs. 5,000",
      duration: "2 - 5 hours",
      warranty: "1 year warranty",
      image: "/images/board-repair.jpg",
      color: "from-orange-500 to-red-500",
    },
  ];

  const repairProcess = [
    {
      step: 1,
      title: "Diagnosis",
      description: "Free diagnostic to identify the exact problem",
      icon: "🔍",
    },
    {
      step: 2,
      title: "Quote",
      description: "Transparent pricing with no hidden costs",
      icon: "💰",
    },
    {
      step: 3,
      title: "Repair",
      description: "Expert repair using genuine parts",
      icon: "🔧",
    },
    {
      step: 4,
      title: "Testing",
      description: "Thorough testing to ensure quality",
      icon: "✅",
    },
  ];

  const whyChooseUs = [
    {
      title: "Expert Technicians",
      description: "Certified professionals with years of experience",
      icon: "👨‍🔧",
    },
    {
      title: "Genuine Parts",
      description: "Only original and high-quality replacement parts",
      icon: "⚡",
    },
    {
      title: "Quick Service",
      description: "Fast turnaround time without compromising quality",
      icon: "⏱️",
    },
    {
      title: "Warranty Coverage",
      description: "Comprehensive warranty on all repairs",
      icon: "🛡️",
    },
  ];

  const handleWhatsAppContact = (service) => {
    const phoneNumber = "94764845882";
    const message = `Hello Rio Mobile! I need ${service.title.toLowerCase()} service. Can you help me with pricing and appointment?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900">
      {/* Navbar */}
      <Navbar />

      {/* Full Screen Video Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Video Background */}
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          onEnded={handleVideoEnded}
          playsInline
        >
          <source src={videoSources[currentVideoIndex]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

        {/* Content */}
        <div className="relative z-20 flex items-center justify-center h-full">
          <div className="text-center text-white px-4 max-w-4xl">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <span className="text-black font-bold text-4xl">🔧</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Professional Repair Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
              Expert mobile device repair with genuine parts, experienced
              technicians, and comprehensive warranty coverage
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const servicesSection =
                    document.getElementById("services-section");
                  if (servicesSection) {
                    servicesSection.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
                className="bg-gradient-to-r from-green-500 to-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-green-600 hover:to-green-800 transform hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                Explore Services
              </button>
              <button
                onClick={() => {
                  const phoneNumber = "94764845882";
                  const message =
                    "Hello Rio Mobile! I need repair service. Can you help me with pricing and appointment?";
                  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                    message
                  )}`;
                  window.open(whatsappUrl, "_blank");
                }}
                className="border-2 border-green-500 text-green-400 px-8 py-4 rounded-full font-semibold hover:bg-green-500 hover:text-black transform hover:scale-105 transition-all duration-300"
              >
                Get Quote
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div
            className="animate-bounce cursor-pointer"
            onClick={() => {
              const servicesSection =
                document.getElementById("services-section");
              if (servicesSection) {
                servicesSection.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }}
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

      {/* Services Section */}
      <section
        id="services-section"
        className="bg-gradient-to-b from-black to-gray-900 py-20"
      >
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-black font-bold text-3xl">🔧</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-4">
              Our Services
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional mobile device repair services with expert technicians
              and genuine parts
            </p>
          </div>

          {/* Main Services */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:scale-105"
              >
                {/* Service Header */}
                <div className="text-center mb-6">
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  >
                    <span className="text-4xl">{service.icon}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">
                    {service.title}
                  </h2>
                  <p className="text-gray-300">{service.description}</p>
                </div>

                {/* Service Image */}
                <div className="bg-gray-700 rounded-xl h-48 mb-6 flex items-center justify-center relative overflow-hidden">
                  {service.image &&
                  service.image !== "/images/placeholder.jpg" ? (
                    <img
                      src={service.image}
                      alt={service.title}
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
                        service.image &&
                        service.image !== "/images/placeholder.jpg"
                          ? "none"
                          : "flex",
                    }}
                  >
                    {service.icon}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    What's Included:
                  </h3>
                  <div className="space-y-2">
                    {service.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center text-gray-300 text-sm"
                      >
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Details */}
                <div className="bg-gray-700/30 rounded-xl p-4 mb-6">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Pricing:</span>
                      <span className="text-green-400 font-semibold">
                        {service.pricing}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Duration:</span>
                      <span className="text-white">{service.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Warranty:</span>
                      <span className="text-green-400">{service.warranty}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleWhatsAppContact(service)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-700 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-800 transition-all duration-300 transform hover:scale-105"
                  >
                    Book Service
                  </button>
                  <button
                    onClick={() =>
                      setSelectedService(
                        selectedService === service.id ? null : service.id
                      )
                    }
                    className="px-6 border border-green-500 text-green-400 py-3 rounded-xl font-semibold hover:bg-green-500 hover:text-black transition-all duration-300"
                  >
                    Details
                  </button>
                </div>

                {/* Expanded Details */}
                {selectedService === service.id && (
                  <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <h4 className="text-white font-semibold mb-3">
                      Service Details:
                    </h4>
                    <p className="text-gray-300 text-sm mb-3">
                      Our {service.title.toLowerCase()} service includes
                      comprehensive diagnosis, professional repair using genuine
                      parts, and thorough testing to ensure optimal performance.
                    </p>
                    <div className="text-green-400 text-sm font-medium">
                      ✓ Free diagnosis • ✓ Transparent pricing • ✓ Expert
                      technicians
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Repair Process */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Our Repair Process
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Simple, transparent, and professional repair process designed
                for your convenience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {repairProcess.map((step, index) => (
                <div key={step.step} className="text-center">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-3xl">{step.icon}</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-sm">
                        {step.step}
                      </span>
                    </div>
                    {index < repairProcess.length - 1 && (
                      <div className="hidden md:block absolute top-10 left-24 w-32 h-0.5 bg-green-500/30"></div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why Choose Rio Mobile?
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                We're committed to providing the best repair services with
                quality and reliability
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseUs.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20 text-center"
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">{item.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-green-500/20 to-green-700/20 rounded-2xl p-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                Need Repair Service?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Get your device repaired by our expert technicians. Quick,
                reliable, and affordable repair services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    const phoneNumber = "94764845882";
                    const message =
                      "Hello Rio Mobile! I need repair service. Can you help me with pricing and appointment?";
                    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                      message
                    )}`;
                    window.open(whatsappUrl, "_blank");
                  }}
                  className="bg-gradient-to-r from-green-500 to-green-700 text-white px-8 py-4 rounded-full font-semibold hover:from-green-600 hover:to-green-800 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.905 3.488" />
                  </svg>
                  <span>WhatsApp Us</span>
                </button>
                <Link
                  to="/contact"
                  className="border-2 border-green-500 text-green-400 px-8 py-4 rounded-full font-semibold hover:bg-green-500 hover:text-black transform hover:scale-105 transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Services;
