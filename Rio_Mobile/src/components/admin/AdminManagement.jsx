import React, { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import Swal from "sweetalert2";

function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [currentUserPermissions, setCurrentUserPermissions] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "admin",
    status: "active",
    department: "",
    permissions: [],
  });

  // Available permissions
  const availablePermissions = [
    "view_products",
    "add_products",
    "edit_products",
    "delete_products",
    "view_admins",
    "add_admins",
    "edit_admins",
    "delete_admins",
  ];

  // Get current user permissions (simulate getting from auth context)
  useEffect(() => {
    // In a real app, get this from auth context or token
    const permissions = JSON.parse(
      localStorage.getItem("adminPermissions") ||
        '["view_admins", "add_admins", "edit_admins", "delete_admins"]'
    );
    setCurrentUserPermissions(permissions);
  }, []);

  // Check if user has specific permission
  const hasPermission = (permission) => {
    return (
      currentUserPermissions.includes(permission) ||
      currentUserPermissions.includes("super_admin")
    );
  };

  // Fetch admins from database
  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/admins");
      const result = await response.json();

      if (result.success) {
        setAdmins(result.data);
        console.log("👥 Admins loaded from database:", result.data.length);
      } else {
        console.error("Failed to fetch admins:", result.message);
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
    setLoading(false);
  };

  // Load admins on component mount
  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "permissions") {
      if (checked) {
        setFormData((prev) => ({
          ...prev,
          permissions: [...prev.permissions, value],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          permissions: prev.permissions.filter((p) => p !== value),
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("📤 Adding admin to database:", formData);

      const response = await fetch("http://localhost:5000/api/admins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          title: "Success!",
          text: `Admin "${formData.name}" added successfully!`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        console.log("✅ Admin saved to database:", result.data);

        // Refresh admins list
        await fetchAdmins();

        // Reset form
        resetForm();
      } else {
        Swal.fire({
          title: "Error!",
          text: result.message || "Failed to add admin",
          icon: "error",
        });
        console.error("❌ Failed to save admin:", result);
      }
    } catch (error) {
      console.error("❌ Error saving admin:", error);
      Swal.fire({
        title: "Network Error!",
        text: "Failed to connect to server. Please check your connection.",
        icon: "error",
      });
    }

    setLoading(false);
  };

  const handleEdit = (admin) => {
    if (!hasPermission("edit_admins")) {
      Swal.fire({
        title: "Access Denied!",
        text: "You don't have permission to edit admins.",
        icon: "error",
      });
      return;
    }

    setEditingAdmin(admin);
    setFormData({
      name: admin.name,
      email: admin.email,
      password: "", // Don't populate password for security
      phone: admin.phone || "",
      role: admin.role || "admin",
      status: admin.status || "active",
      department: admin.department || "",
      permissions: admin.permissions || [],
    });
    setShowEditForm(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("📤 Updating admin in database:", formData);

      // Don't send password if it's empty
      const updateData = { ...formData };
      if (!updateData.password) {
        delete updateData.password;
      }

      const response = await fetch(
        `http://localhost:5000/api/admins/${editingAdmin._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          title: "Success!",
          text: `Admin "${formData.name}" updated successfully!`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        console.log("✅ Admin updated in database:", result.data);

        // Refresh admins list
        await fetchAdmins();

        // Reset form
        resetForm();
      } else {
        Swal.fire({
          title: "Error!",
          text: result.message || "Failed to update admin",
          icon: "error",
        });
        console.error("❌ Failed to update admin:", result);
      }
    } catch (error) {
      console.error("❌ Error updating admin:", error);
      Swal.fire({
        title: "Network Error!",
        text: "Failed to connect to server. Please check your connection.",
        icon: "error",
      });
    }

    setLoading(false);
  };

  const handleDelete = async (adminId, adminName) => {
    if (!hasPermission("delete_admins")) {
      Swal.fire({
        title: "Access Denied!",
        text: "You don't have permission to delete admins.",
        icon: "error",
      });
      return;
    }

    const result = await Swal.fire({
      title: `Delete "${adminName}"?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/admins/${adminId}`,
          {
            method: "DELETE",
          }
        );

        const deleteResult = await response.json();

        if (deleteResult.success) {
          await fetchAdmins(); // Refresh list
          Swal.fire("Deleted!", "The admin has been removed.", "success");
        } else {
          Swal.fire("Error!", deleteResult.message, "error");
        }
      } catch (error) {
        console.error("Error deleting admin:", error);
        Swal.fire("Error!", "Failed to delete admin.", "error");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "admin",
      status: "active",
      department: "",
      permissions: [],
    });
    setShowAddForm(false);
    setShowEditForm(false);
    setEditingAdmin(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "inactive":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "super_admin":
        return "👑";
      case "admin":
        return "👤";
      case "moderator":
        return "🛡️";
      default:
        return "👤";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header with Add Admin Button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">All Admins</h1>
            <p className="text-gray-400">
              Manage admin users and their permissions • Total Admins:{" "}
              {admins.length}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={() => setShowAddForm(true)}
              disabled={loading}
              className="bg-gradient-to-r from-green-500 to-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-800 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 shadow-lg"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Add New Admin</span>
            </button>
          </div>
        </div>

        {/* Add Admin Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-green-500/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Add New Admin</h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-white transition-colors"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter email address"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password *
                    </label>
                    <input
                      type="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter password"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter phone number"
                    />
                  </div>

                </div>

                {/* Form Actions */}
                <div className="flex space-x-4 pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-green-800 transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Adding Admin...
                      </>
                    ) : (
                      "Add Admin"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 border border-gray-600 text-gray-300 py-3 px-6 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Admin Modal */}
        {showEditForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-green-500/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Edit Admin</h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-white transition-colors"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter email address"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      New Password (leave blank to keep current)
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter new password"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex space-x-4 pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Updating Admin...
                      </>
                    ) : (
                      "Update Admin"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 border border-gray-600 text-gray-300 py-3 px-6 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Admins Table */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Admin Users</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchAdmins}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center space-x-2"
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>{loading ? "Loading..." : "Refresh"}</span>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading admins from database...</p>
            </div>
          ) : admins.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-400 text-2xl">👥</span>
              </div>
              <p className="text-gray-400 text-lg mb-4">
                No admins found in database
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Add Your First Admin
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-4 px-4 text-gray-300 font-medium">
                      Admin
                    </th>
                    <th className="text-left py-4 px-4 text-gray-300 font-medium">
                      Contact
                    </th>
                    <th className="text-left py-4 px-4 text-gray-300 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin) => (
                    <tr
                      key={admin._id}
                      className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-black font-bold">
                              {admin.name?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="text-white font-medium">
                              {admin.name}
                            </p>
                            <p className="text-gray-400 text-sm">
                              ID: {admin._id.slice(-6)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-white text-sm">{admin.email}</p>
                          {admin.phone && (
                            <p className="text-gray-400 text-sm">
                              {admin.phone}
                            </p>
                          )}
                        </div>
                      </td>
                      
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          {hasPermission("edit_admins") && (
                            <button
                              onClick={() => handleEdit(admin)}
                              className="text-blue-400 hover:text-blue-300 transition-colors p-2 rounded-lg hover:bg-blue-400/10"
                              title="Edit admin"
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
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                          )}
                          {hasPermission("delete_admins") && (
                            <button
                              onClick={() =>
                                handleDelete(admin._id, admin.name)
                              }
                              className="text-red-400 hover:text-red-300 transition-colors p-2 rounded-lg hover:bg-red-400/10"
                              title="Delete admin"
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
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          )}
                          {!hasPermission("edit_admins") &&
                            !hasPermission("delete_admins") && (
                              <span className="text-gray-500 text-sm">
                                No actions available
                              </span>
                            )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminManagement;
