import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function AdminSidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleSubMenu = (menuId) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const handleLogout = () => {
    // Clear admin session data
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("adminEmail");

    // Show logout confirmation
    console.log("🚪 Admin logged out successfully");

    // Navigate to login page
    navigate("/adminn");
  };

  const menuItems = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: "📊",
      path: "/admin",
      exact: true,
    },
    {
      id: "products",
      title: "Products",
      icon: "📱",
      hasSubMenu: true,
      subItems: [
        { title: "All Products", path: "/admin/products", icon: "📋" },
        { title: "Add Product", path: "/admin/products/add", icon: "➕" },
      ],
    },
    {
      id: "Admins",
      title: "Admins",
      icon: "📦",
      hasSubMenu: true,
      subItems: [
        { title: "All Admins", path: "/admin/orders", icon: "📋" },
        { title: "Add Admin", path: "/admin/orders/pending", icon: "➕" },
      ],
    },
  ];

  const isActiveLink = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-gray-900 to-black border-r border-green-500/20 z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-green-500/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-xl">R</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Rio Mobile
              </h1>
              <p className="text-xs text-gray-400">Admin Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <div key={item.id}>
                {item.hasSubMenu ? (
                  <>
                    {/* Menu Item with SubMenu */}
                    <button
                      onClick={() => toggleSubMenu(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                        isActiveLink(item.path) || expandedMenus[item.id]
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{item.icon}</span>
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          expandedMenus[item.id] ? "rotate-180" : ""
                        }`}
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

                    {/* SubMenu Items */}
                    {expandedMenus[item.id] && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.subItems.map((subItem, index) => (
                          <Link
                            key={index}
                            to={subItem.path}
                            className={`flex items-center space-x-3 px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                              isActiveLink(subItem.path)
                                ? "bg-green-500/20 text-green-400 border-l-2 border-green-400"
                                : "text-gray-400 hover:bg-gray-800 hover:text-white"
                            }`}
                          >
                            <span className="text-base">{subItem.icon}</span>
                            <span>{subItem.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  /* Simple Menu Item */
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActiveLink(item.path, item.exact)
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.title}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-green-500/20">
          <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-xl">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-black font-bold">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                Admin User
              </p>
              <p className="text-xs text-gray-400 truncate">
                admin@riomobile.com
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-3 flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminSidebar;
