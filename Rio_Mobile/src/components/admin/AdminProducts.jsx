import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import Swal from "sweetalert2";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    ram: "",
    storage: "",
    color: "",
    price: "",
    category: "",
    description: "",
    brand: "",
    image: "",
    stock: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Fetch products from database
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const result = await response.json();

      if (result.success) {
        setProducts(result.data);
        console.log("📦 Products loaded from database:", result.data.length);
      } else {
        console.error("Failed to fetch products:", result.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  // Load products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = [
    {
      id: "mobile_phone",
      name: "Mobile Phone",
      icon: "📱",
      fields: [
        "name",
        "ram",
        "storage",
        "color",
        "price",
        "brand",
        "description",
        "image",
      ],
    },
    {
      id: "accessories",
      name: "Accessories",
      icon: "🎧",
      fields: ["name", "color", "price", "brand", "description", "image"],
    },
    {
      id: "bluetooth_speaker",
      name: "Bluetooth Speaker",
      icon: "🔊",
      fields: ["name", "color", "price", "brand", "description", "image"],
    },
    {
      id: "jbl_party_box",
      name: "JBL Party Box",
      icon: "🎉",
      fields: ["name", "color", "price", "description", "image"],
    },
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.id);
    setFormData({
      ...formData,
      category: category.name,
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image upload with better compression
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 1MB for better server handling)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          title: "File Too Large",
          text: "Image size should be less than 5MB. Please compress your image.",
          icon: "error",
        });
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        Swal.fire({
          title: "Invalid File Type",
          text: "Please select an image file (JPG, PNG, GIF, etc.)",
          icon: "error",
        });
        return;
      }

      // Create preview and compress image aggressively
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log("📸 File loaded, starting compression...");
        const img = new Image();
        img.onload = () => {
          console.log(
            `📸 Original image dimensions: ${img.width}x${img.height}`
          );

          // Create canvas to compress image
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Calculate new dimensions (max 400px width/height for smaller size)
          const maxSize = 400;
          let { width, height } = img;

          if (width > height) {
            if (width > maxSize) {
              height = (height * maxSize) / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = (width * maxSize) / height;
              height = maxSize;
            }
          }

          console.log(`📸 Compressed dimensions: ${width}x${height}`);

          canvas.width = width;
          canvas.height = height;

          // Draw and compress more aggressively
          ctx.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.5); // 50% quality for smaller size

          // Check final size
          const finalSize = Math.round((compressedBase64.length * 0.75) / 1024); // Approximate KB
          console.log(`📸 Image compressed to ~${finalSize}KB`);

          if (finalSize > 200) {
            console.warn(
              "⚠️ Compressed image is still large, might cause issues"
            );
          }

          setImagePreview(compressedBase64);
          setFormData({
            ...formData,
            image: compressedBase64,
          });

          console.log("✅ Image processing complete");
        };

        img.onerror = () => {
          console.error("❌ Failed to load image");
          Swal.fire({
            title: "Image Error",
            text: "Failed to process the image. Please try a different image.",
            icon: "error",
          });
        };

        img.src = e.target.result;
      };

      reader.onerror = () => {
        console.error("❌ Failed to read file");
        Swal.fire({
          title: "File Error",
          text: "Failed to read the image file. Please try again.",
          icon: "error",
        });
      };

      console.log("📸 Starting to read file...");
      reader.readAsDataURL(file);
    }
  };

  // Remove image
  const removeImage = () => {
    setImagePreview(null);
    setFormData({
      ...formData,
      image: "",
    });
    // Reset file inputs
    const fileInput = document.getElementById("image-upload");
    const editFileInput = document.getElementById("image-upload-edit");
    if (fileInput) fileInput.value = "";
    if (editFileInput) editFileInput.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("📤 Adding product to database:", formData);

      // Prepare data for API
      const productData = {
        name: formData.name,
        category: selectedCategory,
        brand: formData.brand,
        ram: formData.ram,
        storage: formData.storage,
        color: formData.color,
        price: parseFloat(formData.price),
        description: formData.description,
        image: formData.image,
        stock: parseInt(formData.stock) || 0,
      };

      console.log("📦 Sending product data:", {
        ...productData,
        image: productData.image ? "Image included" : "No image",
      });

      // Send to backend API
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          title: "Success!",
          text: `Product "${formData.name}" added successfully to database!`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        console.log("✅ Product saved to database:", result.data);

        // Refresh products list
        await fetchProducts();
      } else {
        Swal.fire({
          title: "Error!",
          text: result.message || "Failed to add product",
          icon: "error",
        });
        console.error("❌ Failed to save product:", result);
      }
    } catch (error) {
      console.error("❌ Error saving product:", error);
      Swal.fire({
        title: "Network Error!",
        text: "Failed to connect to server. Please check your connection.",
        icon: "error",
      });
    }

    // Reset form
    setFormData({
      name: "",
      ram: "",
      storage: "",
      color: "",
      price: "",
      category: "",
      description: "",
      brand: "",
      image: "",
      stock: "",
    });
    setImagePreview(null);
    setSelectedCategory("");
    setShowAddForm(false);
    setLoading(false);
  };

  const handleDelete = async (productId, productName) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (result.success) {
        await fetchProducts(); // Refresh list
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  // Handle edit product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setSelectedCategory(product.category);
    setFormData({
      name: product.name,
      ram: product.ram || "",
      storage: product.storage || "",
      color: product.color,
      price: product.price.toString(),
      category: product.category,
      description: product.description || "",
      brand: product.brand || "",
      image: product.image || "",
      stock: (product.stock || 0).toString(),
    });
    setImagePreview(product.image || null);
    setShowEditForm(true);
  };

  // Handle update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("📤 Updating product in database:", formData);

      // Prepare data for API - only include image if it's been changed
      const productData = {
        name: formData.name,
        category: selectedCategory,
        brand: formData.brand,
        ram: formData.ram,
        storage: formData.storage,
        color: formData.color,
        price: parseFloat(formData.price),
        description: formData.description,
        stock: parseInt(formData.stock) || 0,
      };

      // Handle image data carefully
      if (formData.image) {
        if (formData.image.startsWith("data:image")) {
          // New image uploaded
          console.log("📸 New image detected, including in update");
          productData.image = formData.image;
        } else {
          // Existing image URL - keep it
          console.log("📸 Keeping existing image");
          productData.image = formData.image;
        }
      } else {
        // No image
        console.log("📸 No image in update");
        productData.image = "";
      }

      console.log("📦 Sending update data:", {
        ...productData,
        image: productData.image ? "Image included" : "No image",
      });

      // Send to backend API with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(
        `http://localhost:5000/api/products/${editingProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          title: "Success!",
          text: `Product "${formData.name}" updated successfully!`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        console.log("✅ Product updated in database:", result.data);

        // Refresh products list
        await fetchProducts();
      } else {
        Swal.fire({
          title: "Update Failed!",
          text: result.message || "Failed to update product",
          icon: "error",
        });
        console.error("❌ Failed to update product:", result);
      }
    } catch (error) {
      console.error("❌ Error updating product:", error);

      let errorMessage =
        "Failed to connect to server. Please check your connection.";

      if (error.name === "AbortError") {
        errorMessage = "Request timed out. The image might be too large.";
      } else if (error.message.includes("413")) {
        errorMessage =
          "Image is too large for the server. Please use a smaller image.";
      } else if (error.message.includes("500")) {
        errorMessage = "Server error. Please try again or contact support.";
      }

      Swal.fire({
        title: "Network Error!",
        text: errorMessage,
        icon: "error",
      });
    }

    // Reset form
    setFormData({
      name: "",
      ram: "",
      storage: "",
      color: "",
      price: "",
      category: "",
      description: "",
      brand: "",
      image: "",
      stock: "",
    });
    setImagePreview(null);
    setSelectedCategory("");
    setEditingProduct(null);
    setShowEditForm(false);
    setLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "inactive":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStockColor = (stock) => {
    if (stock <= 5) return "text-red-400";
    if (stock <= 10) return "text-yellow-400";
    return "text-green-400";
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "mobile_phone":
        return "📱";
      case "accessories":
        return "🎧";
      case "bluetooth_speaker":
        return "🔊";
      case "jbl_party_box":
        return "🎉";
      default:
        return "📦";
    }
  };

  const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  // Handle quick stock update
  const handleQuickStockUpdate = async (productId, newStock) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ stock: newStock }),
        }
      );

      const result = await response.json();

      if (result.success) {
        console.log(`✅ Stock updated to ${newStock}`);
        await fetchProducts(); // Refresh list
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error updating stock:", error);
      alert("Failed to update stock.");
    }
  };

  // Toggle stock status (In Stock / Out of Stock)
  const handleToggleStock = async (productId, currentStock) => {
    const newStock = currentStock === 0 ? 10 : 0; // Toggle between 0 and 10
    await handleQuickStockUpdate(productId, newStock);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Products Management
            </h1>
            <p className="text-gray-400">
              Manage your product inventory • Total Products: {products.length}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={() => setShowAddForm(true)}
              disabled={loading}
              className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-800 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
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
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* Add Product Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-green-500/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Add New Product to Database
                </h2>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setSelectedCategory("");
                    setImagePreview(null);
                    setFormData({
                      name: "",
                      ram: "",
                      storage: "",
                      color: "",
                      price: "",
                      category: "",
                      description: "",
                      brand: "",
                      image: "",
                      stock: "",
                    });
                  }}
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

              {!selectedCategory ? (
                /* Category Selection */
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Select Product Category:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category)}
                        className="bg-gray-800/50 hover:bg-gray-700/50 border border-green-500/20 hover:border-green-500/40 rounded-xl p-6 transition-all duration-200 text-left group"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                            <span className="text-2xl">{category.icon}</span>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white">
                              {category.name}
                            </h4>
                            <p className="text-gray-400 text-sm">
                              Add {category.name.toLowerCase()}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Product Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory("");
                        setImagePreview(null);
                      }}
                      className="text-green-400 hover:text-green-300 transition-colors"
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
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                      </svg>
                    </button>
                    <h3 className="text-lg font-semibold text-white">
                      Add{" "}
                      {categories.find((c) => c.id === selectedCategory)?.name}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Form Fields */}
                    <div className="lg:col-span-2 space-y-4">
                      {/* Product Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Product Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="Enter product name"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Brand */}
                        {categories
                          .find((c) => c.id === selectedCategory)
                          ?.fields.includes("brand") && (
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Brand
                            </label>
                            <input
                              type="text"
                              name="brand"
                              value={formData.brand}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                              placeholder="Enter brand name"
                            />
                          </div>
                        )}

                        {/* RAM (Mobile Phone only) */}
                        {selectedCategory === "mobile_phone" && (
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              RAM *
                            </label>
                            <select
                              name="ram"
                              required
                              value={formData.ram}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            >
                              <option value="">Select RAM</option>
                              <option value="4GB">4GB</option>
                              <option value="6GB">6GB</option>
                              <option value="8GB">8GB</option>
                              <option value="12GB">12GB</option>
                              <option value="16GB">16GB</option>
                            </select>
                          </div>
                        )}

                        {/* Storage (Mobile Phone only) */}
                        {selectedCategory === "mobile_phone" && (
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Storage *
                            </label>
                            <select
                              name="storage"
                              required
                              value={formData.storage}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            >
                              <option value="">Select Storage</option>
                              <option value="64GB">64GB</option>
                              <option value="128GB">128GB</option>
                              <option value="256GB">256GB</option>
                              <option value="512GB">512GB</option>
                              <option value="1TB">1TB</option>
                            </select>
                          </div>
                        )}

                        {/* Color */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Color *
                          </label>
                          <input
                            type="text"
                            name="color"
                            required
                            value={formData.color}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter color"
                          />
                        </div>

                        {/* Price */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Price (Rs.) *
                          </label>
                          <input
                            type="number"
                            name="price"
                            required
                            value={formData.price}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter price"
                          />
                        </div>

                        {/* Stock */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Stock Quantity *
                          </label>
                          <input
                            type="number"
                            name="stock"
                            required
                            min="0"
                            value={formData.stock}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter stock quantity"
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Description
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                          placeholder="Enter product description"
                        />
                      </div>
                    </div>

                    {/* Right Column - Image Upload */}
                    <div className="lg:col-span-1">
                      <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                        <h4 className="text-lg font-semibold text-white mb-4">
                          Product Image
                        </h4>

                        {!imagePreview ? (
                          <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center">
                            <svg
                              className="w-12 h-12 text-gray-400 mx-auto mb-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                            <p className="text-gray-400 mb-4">
                              Upload product image
                            </p>
                            <label className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors">
                              Choose Image
                              <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                              />
                            </label>
                            <p className="text-xs text-gray-500 mt-2">
                              Max size: 1MB
                            </p>
                          </div>
                        ) : (
                          <div className="relative">
                            <img
                              src={imagePreview}
                              alt="Product preview"
                              className="w-full h-48 object-cover rounded-xl border border-gray-600"
                            />
                            <button
                              type="button"
                              onClick={removeImage}
                              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
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
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
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
                          Saving to Database...
                        </>
                      ) : (
                        "Add Product to Database"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="flex-1 border border-gray-600 text-gray-300 py-3 px-6 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Edit Product Modal */}
        {showEditForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-green-500/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Edit Product in Database
                </h2>
                <button
                  onClick={() => {
                    setShowEditForm(false);
                    setSelectedCategory("");
                    setImagePreview(null);
                    setEditingProduct(null);
                    setFormData({
                      name: "",
                      ram: "",
                      storage: "",
                      color: "",
                      price: "",
                      category: "",
                      description: "",
                      brand: "",
                      image: "",
                      stock: "",
                    });
                  }}
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

              {/* Product Edit Form */}
              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-blue-400"
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
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    Edit {editingProduct?.name}
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Form Fields */}
                  <div className="lg:col-span-2 space-y-4">
                    {/* Product Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter product name"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Brand */}
                      {categories
                        .find((c) => c.id === selectedCategory)
                        ?.fields.includes("brand") && (
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Brand
                          </label>
                          <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter brand name"
                          />
                        </div>
                      )}

                      {/* RAM (Mobile Phone only) */}
                      {selectedCategory === "mobile_phone" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            RAM *
                          </label>
                          <select
                            name="ram"
                            required
                            value={formData.ram}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          >
                            <option value="">Select RAM</option>
                            <option value="4GB">4GB</option>
                            <option value="6GB">6GB</option>
                            <option value="8GB">8GB</option>
                            <option value="12GB">12GB</option>
                            <option value="16GB">16GB</option>
                          </select>
                        </div>
                      )}

                      {/* Storage (Mobile Phone only) */}
                      {selectedCategory === "mobile_phone" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Storage *
                          </label>
                          <select
                            name="storage"
                            required
                            value={formData.storage}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          >
                            <option value="">Select Storage</option>
                            <option value="64GB">64GB</option>
                            <option value="128GB">128GB</option>
                            <option value="256GB">256GB</option>
                            <option value="512GB">512GB</option>
                            <option value="1TB">1TB</option>
                          </select>
                        </div>
                      )}

                      {/* Color */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Color *
                        </label>
                        <input
                          type="text"
                          name="color"
                          required
                          value={formData.color}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="Enter color"
                        />
                      </div>

                      {/* Price */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Price (Rs.) *
                        </label>
                        <input
                          type="number"
                          name="price"
                          required
                          value={formData.price}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="Enter price"
                        />
                      </div>

                      {/* Stock */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Stock Quantity *
                        </label>
                        <input
                          type="number"
                          name="stock"
                          required
                          min="0"
                          value={formData.stock}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="Enter stock quantity"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                          Set to 0 for "Out of Stock" status
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                        placeholder="Enter product description"
                      />
                    </div>
                  </div>

                  {/* Right Column - Image Upload */}
                  <div className="lg:col-span-1">
                    <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                      <h4 className="text-lg font-semibold text-white mb-4">
                        Product Image
                      </h4>

                      {!imagePreview ? (
                        <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center">
                          <svg
                            className="w-12 h-12 text-gray-400 mx-auto mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                          <p className="text-gray-400 mb-4">
                            Upload product image
                          </p>
                          <label className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors">
                            Choose Image
                            <input
                              id="image-upload-edit"
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="hidden"
                            />
                          </label>
                          <p className="text-xs text-gray-500 mt-2">
                            Max size: 5MB
                          </p>
                        </div>
                      ) : (
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="Product preview"
                            className="w-full h-48 object-cover rounded-xl border border-gray-600"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
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
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
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
                        Updating Product...
                      </>
                    ) : (
                      "Update Product"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditForm(false)}
                    className="flex-1 border border-gray-600 text-gray-300 py-3 px-6 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Products List */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Database Products</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchProducts}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? "Loading..." : "Refresh"}
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading products from database...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">
                No products found in database. Add your first product!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-4 px-4 text-gray-300 font-medium">
                      Image
                    </th>
                    <th className="text-left py-4 px-4 text-gray-300 font-medium">
                      Product
                    </th>
                    <th className="text-left py-4 px-4 text-gray-300 font-medium">
                      Category
                    </th>
                    <th className="text-left py-4 px-4 text-gray-300 font-medium">
                      Specs
                    </th>
                    <th className="text-left py-4 px-4 text-gray-300 font-medium">
                      Price
                    </th>
                    <th className="text-left py-4 px-4 text-gray-300 font-medium">
                      Stock
                    </th>
                    <th className="text-left py-4 px-4 text-gray-300 font-medium">
                      Status
                    </th>
                    <th className="text-left py-4 px-4 text-gray-300 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="w-16 h-16 bg-gray-700 rounded-lg overflow-hidden">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextElementSibling.style.display =
                                  "flex";
                              }}
                            />
                          ) : null}
                          <div
                            className="w-full h-full flex items-center justify-center text-2xl"
                            style={{ display: product.image ? "none" : "flex" }}
                          >
                            {getCategoryIcon(product.category)}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-white font-medium">
                            {product.name}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {product.brand}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        {product.category.replace("_", " ")}
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-gray-300 text-sm">
                          {product.ram && <div>RAM: {product.ram}</div>}
                          {product.storage && (
                            <div>Storage: {product.storage}</div>
                          )}
                          <div>Color: {product.color}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-green-400 font-medium">
                        {formatPrice(product.price)}
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`font-medium ${getStockColor(
                              product.stock || 0
                            )}`}
                          >
                            {product.stock || 0}
                          </span>
                          <div className="flex space-x-1">
                            <button
                              onClick={() =>
                                handleQuickStockUpdate(
                                  product._id,
                                  Math.max(0, (product.stock || 0) - 1)
                                )
                              }
                              className="w-6 h-6 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded flex items-center justify-center transition-colors text-xs"
                              title="Decrease stock"
                            >
                              -
                            </button>
                            <button
                              onClick={() =>
                                handleQuickStockUpdate(
                                  product._id,
                                  (product.stock || 0) + 1
                                )
                              }
                              className="w-6 h-6 bg-green-600/20 hover:bg-green-600/40 text-green-400 rounded flex items-center justify-center transition-colors text-xs"
                              title="Increase stock"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="text-xs mt-1">
                          {(product.stock || 0) === 0 ? (
                            <span className="text-red-400 font-medium">
                              Out of Stock
                            </span>
                          ) : (product.stock || 0) <= 5 ? (
                            <span className="text-yellow-400">Low Stock</span>
                          ) : (
                            <span className="text-green-400">In Stock</span>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            product.status || "active"
                          )}`}
                        >
                          {(product.status || "active")
                            .charAt(0)
                            .toUpperCase() +
                            (product.status || "active").slice(1)}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                            title="Edit product"
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
                          <button
                            onClick={() => {
                              Swal.fire({
                                title: `Delete "${product.name}"?`,
                                text: "This action cannot be undone!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#e3342f",
                                cancelButtonColor: "#6c757d",
                                confirmButtonText: "Yes, delete it!",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  handleDelete(product._id, product.name);
                                  Swal.fire(
                                    "Deleted!",
                                    "The product has been removed.",
                                    "success"
                                  );
                                }
                              });
                            }}
                            className="text-red-400 hover:text-red-300 transition-colors"
                            title="Delete product"
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

export default AdminProducts;
