// routes/adminRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const router = express.Router();

// Get all admins
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find().select('-password').sort({ createdAt: -1 });
    res.json({
      success: true,
      data: admins,
      count: admins.length
    });
    console.log(`👥 Fetched ${admins.length} admins from database`);
  } catch (error) {
    console.error('❌ Error fetching admins:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admins',
      error: error.message
    });
  }
});

// Create new admin
router.post('/', async (req, res) => {
  try {
    console.log('📤 Creating new admin:', req.body.name);
    
    // Check if admin with email already exists
    const existingAdmin = await Admin.findOne({ email: req.body.email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin with this email already exists'
      });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const adminData = {
      ...req.body,
      password: hashedPassword
    };
    
    const admin = new Admin(adminData);
    const savedAdmin = await admin.save();
    
    // Remove password from response
    const adminResponse = savedAdmin.toObject();
    delete adminResponse.password;
    
    res.status(201).json({
      success: true,
      data: adminResponse,
      message: 'Admin created successfully'
    });
    
    console.log('✅ Admin saved successfully:', savedAdmin.name);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create admin',
      error: error.message
    });
  }
});

// Update admin
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('📝 Updating admin:', id);
    
    const updateData = { ...req.body, updatedAt: new Date() };
    
    // Hash password if provided
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    } else {
      // Remove password field if not provided
      delete updateData.password;
    }
    
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!updatedAdmin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }
    
    res.json({
      success: true,
      data: updatedAdmin,
      message: 'Admin updated successfully'
    });
    
    console.log('✅ Admin updated successfully:', updatedAdmin.name);
  } catch (error) {
    console.error('❌ Error updating admin:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update admin',
      error: error.message
    });
  }
});

// Delete admin
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('🗑️ Deleting admin:', id);
    
    const deletedAdmin = await Admin.findByIdAndDelete(id).select('-password');
    
    if (!deletedAdmin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Admin deleted successfully',
      data: deletedAdmin
    });
    
    console.log('✅ Admin deleted successfully:', deletedAdmin.name);
  } catch (error) {
    console.error('❌ Error deleting admin:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete admin',
      error: error.message
    });
  }
});

module.exports = router;