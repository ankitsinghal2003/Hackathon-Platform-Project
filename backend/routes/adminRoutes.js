const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  toggleUserStatus,
  getAllSubmissions,
  getHackathonConfig,
  updateHackathonConfig,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  exportData
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// All routes are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

// Dashboard
router.get('/dashboard', getDashboardStats);

// Users management
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);
router.put('/users/:id/status', toggleUserStatus);

// Submissions
router.get('/submissions', getAllSubmissions);

// Hackathon configuration
router.get('/hackathon', getHackathonConfig);
router.put('/hackathon', updateHackathonConfig);

// Categories
router.get('/categories', getCategories);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

// Export
router.get('/export/:type', exportData);

module.exports = router;