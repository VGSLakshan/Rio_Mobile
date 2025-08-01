import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminHeader({ toggleSidebar }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear admin session data
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("adminEmail");

    // Show logout confirmation
    console.log("🚪 Admin logged out successfully");

    // Navigate to login page
    navigate("/login");
  };

  const notifications = [
    {
      id: 1,
      type: "order",
      title: "New Order Received",
      message: "Order #RM-2024-001 from John Doe",
      time: "2 minutes ago",
      unread: true,
    },
    {
      id: 2,
      type: "stock",
      title: "Low Stock Alert",
      message: "Samsung S25 Ultra - Only 3 items left",
      time: "5 minutes ago",
      unread: true,
    },
    {
      id: 3,
      type: "customer",
      title: "New Customer Review",
      message: "5-star review for iPhone 15 Pro",
      time: "10 minutes ago",
      unread: false,
    },
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case "order":
        return "📦";
      case "stock":
        return "⚠️";
      case "customer":
        return "⭐";
      default:
        return "📄";
    }
  };

  return (
    <header className="bg-white/5 backdrop-blur-sm border-b border-green-500/20 px-6 py-4  ">
      <div className="flex items-center justify-between">
        {/* Left Section - Menu Toggle + Breadcrumb */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Breadcrumb */}
          <nav className="hidden md:flex items-center space-x-2 text-sm">
            <Link
              to="/admin"
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              Dashboard
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-300">Overview</span>
          </nav>
        </div>

        {/* Right Section - Search + Notifications + Profile */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="hidden md:flex relative">
            <input
              type="text"
              placeholder="Search products, orders..."
              className="bg-gray-800/50 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 w-64"
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Quick Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            <Link
              to="/admin/products/add"
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="text-sm font-medium">Add Product</span>
            </Link>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 bg-gray-800 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-5 5V17zM21 7v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h12l2 2z"
                />
              </svg>
              {/* Notification Badge */}
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notifications.filter((n) => n.unread).length}
              </span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50">
                <div className="p-4 border-b border-gray-700">
                  <h3 className="text-lg font-semibold text-white">
                    Notifications
                  </h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-700 hover:bg-gray-800 transition-colors cursor-pointer ${
                        notification.unread ? "bg-green-500/5" : ""
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">
                          {getNotificationIcon(notification.type)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm font-medium ${
                              notification.unread
                                ? "text-white"
                                : "text-gray-300"
                            }`}
                          >
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-400 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {notification.time}
                          </p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-700">
                  <button className="w-full text-center text-sm text-green-400 hover:text-green-300 transition-colors">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-3 p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">A</span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white">Admin</p>
                <p className="text-xs text-gray-400">Super Admin</p>
              </div>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Profile Dropdown Menu */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-lg">A</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">Admin User</p>
                      <p className="text-sm text-gray-400">
                        admin@riomobile.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <Link
                    to="/admin/profile"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>Profile Settings</span>
                  </Link>

                  <Link
                    to="/admin/settings"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>Settings</span>
                  </Link>

                  <div className="border-t border-gray-700 my-2"></div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-600/10 hover:text-red-300 rounded-lg transition-colors w-full"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
