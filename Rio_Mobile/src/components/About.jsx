import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const teamMembers = [
    {
      name: "Alex Rivera",
      role: "Founder & CEO",
      description: "Visionary leader with 10+ years in mobile innovation",
    },
    {
      name: "Sarah Chen",
      role: "Head of Product",
      description: "Expert in user experience and product strategy",
    },
    {
      name: "Marcus Johnson",
      role: "Chief Technology Officer",
      description: "Full-stack developer passionate about secure solutions",
    },
    {
      name: "Emma Thompson",
      role: "Head of Design",
      description: "Creative mind behind Rio's beautiful interfaces",
    },
  ];

  const milestones = [
    {
      year: "2020",
      title: "The Beginning",
      description:
        "Rio Mobile was founded with a simple mission: make mobile technology work for everyone.",
    },
    {
      year: "2021",
      title: "First Million Users",
      description:
        "Our user-friendly approach attracted over 1 million active users worldwide.",
    },
    {
      year: "2022",
      title: "Innovation Award",
      description:
        "Recognized as 'Best Mobile App Innovation' for our secure cloud storage solution.",
    },
    {
      year: "2023",
      title: "Global Expansion",
      description:
        "Launched in 25+ countries with localized features and multi-language support.",
    },
    {
      year: "2024",
      title: "Next Generation",
      description:
        "Introducing AI-powered features and enhanced device synchronization.",
    },
  ];

  const features = [
    {
      icon: "💬",
      title: "Smart Communication",
      description:
        "Connect with anyone, anywhere through our intelligent messaging platform",
    },
    {
      icon: "☁️",
      title: "Secure Cloud Storage",
      description:
        "Your data is protected with enterprise-grade encryption and seamless sync",
    },
    {
      icon: "🔄",
      title: "Device Synchronization",
      description:
        "All your devices work together like magic - start on one, finish on another",
    },
    {
      icon: "🛡️",
      title: "Privacy First",
      description:
        "We believe your privacy is sacred. Your data stays yours, always",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900">
      {/* Back to Home Link */}
      <div className="container mx-auto px-4 pt-8">
        <Link
          to="/"
          className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors duration-300"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section
        className={`py-20 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <span className="text-black font-bold text-4xl">R</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-6">
            Connecting Your Digital Life
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We're on a mission to simplify how you communicate, store, and sync
            your digital world.
            <br className="hidden md:block" />
            Rio Mobile brings everything together in one beautiful, secure
            experience.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-16">
            What We Do Best
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-green-500/20"
              >
                <div className="text-6xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-8">
              Our Journey
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              From a small idea to a global platform, here's how Rio Mobile has
              grown to serve millions of users worldwide.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>

            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`flex items-center mb-12 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div
                  className={`w-1/2 ${
                    index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                  }`}
                >
                  <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20">
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-green-600 rounded-full border-4 border-black shadow-lg"></div>
                </div>

                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-16">
            Meet Our Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-green-500/20"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-black font-bold text-2xl">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {member.name}
                </h3>
                <div className="text-green-400 font-semibold mb-4">
                  {member.role}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-8">
              What Drives Us
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Innovation
                </h3>
                <p className="text-gray-300">
                  We're always pushing boundaries to create better, smarter
                  solutions.
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-4">❤️</div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  User-Centric
                </h3>
                <p className="text-gray-300">
                  Every decision we make starts with our users' needs and
                  experiences.
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-2xl font-bold text-white mb-4">Trust</h3>
                <p className="text-gray-300">
                  Your privacy and security are not just features—they're our
                  foundation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500/20 to-green-700/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Join the Rio Family?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Discover how Rio Mobile can transform the way you connect, store,
            and sync your digital life.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/signup"
              className="bg-gradient-to-r from-green-500 to-green-700 text-white px-10 py-4 rounded-full font-semibold text-lg hover:from-green-600 hover:to-green-800 transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              Get Started Today
            </Link>

            <Link
              to="/contact"
              className="border-2 border-green-500 text-green-400 px-10 py-4 rounded-full font-semibold text-lg hover:bg-green-500 hover:text-black transform hover:scale-105 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
