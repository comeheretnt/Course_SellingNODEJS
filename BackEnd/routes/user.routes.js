const express = require('express');
const router = express.Router();
const { checkAuth, authorizeUser } = require('../middlewares/authMiddleware');

const {
  createAccount,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updatePassword,
  deleteAccount,
} = require('../controllers/user.controller');

// Public Routes
router.post('/register', createAccount);  // Register a new user
router.post('/login', loginUser);         // Login
router.get('/logout', logoutUser);        // Logout

// Authenticated Routes
router.get('/profile', checkAuth, authorizeUser, getUserProfile);         // Get user profile
router.put('/update', checkAuth, authorizeUser, updateUserProfile);       // Update profile
router.put('/update-password', checkAuth, authorizeUser, updatePassword); // Update password
router.delete('/delete', checkAuth, authorizeUser, deleteAccount);        // Delete account

module.exports = router;  