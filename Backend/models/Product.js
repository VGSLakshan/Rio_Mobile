const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['mobile_phone', 'accessories', 'bluetooth_speaker', 'jbl_party_box']
  },
  brand: {
    type: String,
    trim: true
  },
  // Mobile phone specific fields
  ram: {
    type: String,
    enum: ['4GB', '6GB', '8GB', '12GB', '16GB']
  },
  storage: {
    type: String,
    enum: ['64GB', '128GB', '256GB', '512GB', '1TB']
  },
  color: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    default: ''
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  specifications: {
    type: Map,
    of: String
  },
  features: [{
    type: String
  }]
}, {
  timestamps: true
});

// Index for faster queries
ProductSchema.index({ category: 1 });
ProductSchema.index({ brand: 1 });
ProductSchema.index({ status: 1 });
ProductSchema.index({ name: 'text', description: 'text' });

// Virtual for formatted price
ProductSchema.virtual('formattedPrice').get(function() {
  return `Rs. ${this.price.toLocaleString()}`;
});

// Method to check if product is low stock
ProductSchema.methods.isLowStock = function() {
  return this.stock <= 10;
};

// Static method to find products by category
ProductSchema.statics.findByCategory = function(category) {
  return this.find({ category, status: 'active' });
};

// Pre-save middleware
ProductSchema.pre('save', function(next) {
  // Convert price to number if it's string
  if (typeof this.price === 'string') {
    this.price = parseFloat(this.price);
  }
  next();
});

module.exports = mongoose.model('Product', ProductSchema);