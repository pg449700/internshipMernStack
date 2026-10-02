const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers
} = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/securityMiddleware');

router.post('/register', authLimiter, registerUser);
router.post('/login', authLimiter, loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.get('/users', protect, admin, getAllUsers);

module.exports = router;
