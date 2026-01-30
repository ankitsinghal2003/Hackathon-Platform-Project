const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  getUsers,
  getUserStats,
  searchUsers,
  deleteAccount
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/profile/:id', getUserProfile);
router.get('/', protect, authorize('admin'), getUsers);
router.get('/stats', protect, getUserStats);
router.get('/search', protect, searchUsers);
router.delete('/account', protect, deleteAccount);

module.exports = router;