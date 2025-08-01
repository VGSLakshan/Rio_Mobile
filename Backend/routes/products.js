const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, brand, status, search, limit = 10, page = 1 } = req.query;
    
    // Build query object
    let query = {};
    
    if (category) query.category = category;
    if (brand) query.brand = new RegExp(brand, 'i');
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { brand: new RegExp(search, 'i') }
      ];
    }

    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Get products with pagination
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .limit(limitNum)
      .skip(skip);

    // Get total count for pagination
    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      data: products,
      pagination: {
        current: pageNum,
        pages: Math.ceil(total / limitNum),
        total,
        limit: limitNum
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching products',
      error: error.message
    });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching product',
      error: error.message
    });
  }
});

// @route   POST /api/products
// @desc    Create new product
// @access  Private (Admin only)
router.post('/', async (req, res) => {
  try {
    console.log('📦 New product creation request:', req.body);

    const {
      name,
      category,
      brand,
      ram,
      storage,
      color,
      price,
      description,
      image,
      stock = 0
    } = req.body;

    // Validation
    if (!name || !category || !color || !price) {
      return res.status(400).json({
        success: false,
        message: 'Name, category, color, and price are required fields'
      });
    }

    // Mobile phone specific validation
    if (category === 'mobile_phone') {
      if (!ram || !storage) {
        return res.status(400).json({
          success: false,
          message: 'RAM and storage are required for mobile phones'
        });
      }
    }

    // Create product
    const productData = {
      name: name.trim(),
      category,
      color: color.trim(),
      price: parseFloat(price),
      description: description?.trim() || '',
      image: image || '',
      stock: parseInt(stock) || 0,
      status: 'active'
    };

    // Add optional fields
    if (brand) productData.brand = brand.trim();
    if (ram) productData.ram = ram;
    if (storage) productData.storage = storage;

    const product = new Product(productData);
    await product.save();

    console.log('✅ Product created successfully:', {
      id: product._id,
      name: product.name,
      category: product.category,
      price: product.formattedPrice
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });

  } catch (error) {
    console.error('❌ Create product error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating product',
      error: error.message
    });
  }
});

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    console.log('✅ Product updated successfully:', updatedProduct.name);

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });

  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating product',
      error: error.message
    });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    console.log('🗑️ Product deleted successfully:', product.name);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting product',
      error: error.message
    });
  }
});

// @route   GET /api/products/category/:category
// @desc    Get products by category
// @access  Public
router.get('/category/:category', async (req, res) => {
  try {
    const products = await Product.findByCategory(req.params.category);
    
    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    console.error('Get products by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching products by category',
      error: error.message
    });
  }
});

// @route   GET /api/products/stats/overview
// @desc    Get product statistics
// @access  Private (Admin only)
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalValue: { $sum: { $multiply: ['$price', '$stock'] } },
          avgPrice: { $avg: '$price' },
          totalStock: { $sum: '$stock' }
        }
      }
    ]);

    const lowStockProducts = await Product.find({ stock: { $lte: 10 }, status: 'active' });
    const totalProducts = await Product.countDocuments({ status: 'active' });

    res.json({
      success: true,
      data: {
        categoryStats: stats,
        lowStockProducts,
        totalProducts,
        lowStockCount: lowStockProducts.length
      }
    });
  } catch (error) {
    console.error('Get product stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching product statistics',
      error: error.message
    });
  }
});

module.exports = router;