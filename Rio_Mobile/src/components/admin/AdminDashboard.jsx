import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 2456,
    totalRevenue: 158430,
    totalProducts: 127,
    totalCustomers: 1829,
    pendingOrders: 24,
    lowStockItems: 8,
    monthlyGrowth: 12.5,
    todaySales: 5280,
  });

  const recentOrders = [
    {
      id: "RM-2024-001",
      customer: "John Doe",
      product: "Samsung S25 Ultra",
      amount: 264990,
      status: "completed",
      date: "2024-01-15",
    },
    {
      id: "RM-2024-002",
      customer: "Sarah Smith",
      product: "iPhone 15 Pro",
      amount: 380000,
      status: "pending",
      date: "2024-01-15",
    },
    {
      id: "RM-2024-003",
      customer: "Mike Johnson",
      product: "JBL PartyBox 310",
      amount: 125000,
      status: "processing",
      date: "2024-01-14",
    },
    {
      id: "RM-2024-004",
      customer: "Emma Wilson",
      product: "AirPods Pro 2",
      amount: 65000,
      status: "completed",
      date: "2024-01-14",
    },
  ];

  const lowStockProducts = [
    { name: "Samsung S25 Ultra", stock: 3, threshold: 10 },
    { name: "iPhone 15 Pro Max", stock: 5, threshold: 15 },
    { name: "JBL Flip 6", stock: 2, threshold: 8 },
    { name: "Galaxy Watch 6", stock: 4, threshold: 12 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "processing":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-8">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Orders */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Orders</p>
              <p className="text-3xl font-bold text-white mt-2">
                {stats.totalOrders.toLocaleString()}
              </p>
              <p className="text-green-400 text-sm mt-2">
                +{stats.monthlyGrowth}% this month
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📦</span>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-white mt-2">
                {formatCurrency(stats.totalRevenue)}
              </p>
              <p className="text-green-400 text-sm mt-2">+15.3% this month</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">
                Total Products
              </p>
              <p className="text-3xl font-bold text-white mt-2">
                {stats.totalProducts}
              </p>
              <p className="text-yellow-400 text-sm mt-2">
                {stats.lowStockItems} low stock
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📱</span>
            </div>
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">
                Total Customers
              </p>
              <p className="text-3xl font-bold text-white mt-2">
                {stats.totalCustomers.toLocaleString()}
              </p>
              <p className="text-green-400 text-sm mt-2">+8.2% this month</p>
            </div>
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/orders/pending"
          className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl p-6 hover:scale-105 transition-transform duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Pending Orders</h3>
              <p className="text-3xl font-bold text-yellow-400 mt-2">
                {stats.pendingOrders}
              </p>
              <p className="text-gray-400 mt-2">Requires attention</p>
            </div>
            <span className="text-4xl">⏳</span>
          </div>
        </Link>

        <Link
          to="/admin/inventory/low-stock"
          className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-2xl p-6 hover:scale-105 transition-transform duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Low Stock Items</h3>
              <p className="text-3xl font-bold text-red-400 mt-2">
                {stats.lowStockItems}
              </p>
              <p className="text-gray-400 mt-2">Need restocking</p>
            </div>
            <span className="text-4xl">⚠️</span>
          </div>
        </Link>

        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Today's Sales</h3>
              <p className="text-3xl font-bold text-green-400 mt-2">
                {formatCurrency(stats.todaySales)}
              </p>
              <p className="text-gray-400 mt-2">Great performance!</p>
            </div>
            <span className="text-4xl">📈</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
