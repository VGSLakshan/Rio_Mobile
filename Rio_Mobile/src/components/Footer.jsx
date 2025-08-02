import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black py-16 border-t border-green-500/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-xl">R</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                  Rio Mobile
                </h3>
                <p className="text-gray-400 text-sm">
                  Connecting Your Digital Life
                </p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              We're on a mission to simplify how you communicate, store, and
              sync your digital world. Rio Mobile brings everything together in
              one beautiful, secure experience.
            </p>
            <div className="flex space-x-4">
              {["📘", "📷", "🐦", "📺"].map((icon, index) => (
                <div
                  key={index}
                  className="w-10 h-10 bg-gray-800/50 rounded-full flex items-center justify-center hover:bg-green-500/20 transition-colors duration-300 cursor-pointer"
                >
                  <span className="text-lg">{icon}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {[
                { name: "Home", path: "/" },
                { name: "Products", path: "/products" },
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Services", path: "/services" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center space-x-2"
                  >
                    <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Get in Touch
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-400">
                <span className="text-green-400">📍</span>
                <span className="text-sm">123 Tech Street, Digital City</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <span className="text-green-400">📞</span>
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <span className="text-green-400">📧</span>
                <span className="text-sm">hello@riomobile.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <span className="text-green-400">💬</span>
                <span className="text-sm">24/7 Support Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Rio Mobile. All rights reserved.
              Built with ❤️ for better connections.
            </div>
            <div className="flex space-x-6 text-sm">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
