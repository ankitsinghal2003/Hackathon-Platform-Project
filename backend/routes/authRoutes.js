const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  updateDetails,
  updatePassword,
  logout,
  uploadProfilePicture
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { uploadProfilePicture: uploadMiddleware } = require('../middleware/uploadMiddleware');
const {
  registerValidation,
  loginValidation,
  validate
} = require('../utils/validators');

router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.post('/logout', protect, logout);
router.post('/upload-profile-picture', protect, uploadMiddleware, uploadProfilePicture);

module.exports = router;