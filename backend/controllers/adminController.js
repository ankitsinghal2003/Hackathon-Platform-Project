const User = require('../models/User');
const Team = require('../models/Team');
const Project = require('../models/Project');
const Category = require('../models/Category');
const Hackathon = require('../models/Hackathon');
const Submission = require('../models/Submission');
const Evaluation = require('../models/Evaluation');
const { asyncHandler } = require('../middleware/errorHandler');

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
exports.getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalUsers,
    totalTeams,
    totalProjects,
    totalSubmissions,
    totalEvaluations
  ] = await Promise.all([
    User.countDocuments(),
    Team.countDocuments(),
    Project.countDocuments(),
    Submission.countDocuments({ status: 'submitted' }),
    Evaluation.countDocuments({ isComplete: true })
  ]);

  // User statistics by role
  const usersByRole = await User.aggregate([
    { $group: { _id: '$role', count: { $sum: 1 } } }
  ]);

  // Projects by category
  const projectsByCategory = await Project.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'categoryInfo'
      }
    },
    { $unwind: '$categoryInfo' },
    {
      $group: {
        _id: '$categoryInfo.name',
        count: { $sum: 1 }
      }
    }
  ]);

  // Recent registrations (last 7 days)
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recentRegistrations = await User.countDocuments({
    createdAt: { $gte: sevenDaysAgo }
  });

  // Submission stats
  const submissionStats = await Project.aggregate([
    {
      $group: {
        _id: '$submissionStatus',
        count: { $sum: 1 }
      }
    }
  ]);

  const stats = {
    overview: {
      totalUsers,
      totalTeams,
      totalProjects,
      totalSubmissions,
      totalEvaluations
    },
    usersByRole,
    projectsByCategory,
    recentRegistrations,
    submissionStats
  };

  res.status(200).json({
    success: true,
    data: stats
  });
});

// @desc    Get all users with filters
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = asyncHandler(async (req, res) => {
  const { role, search, page = 1, limit = 20 } = req.query;

  let query = {};

  if (role) query.role = role;
  if (search) {
    query.$or = [
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  const users = await User.find(query)
    .select('-password')
    .populate('team', 'name')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const count = await User.countDocuments(query);

  res.status(200).json({
    success: true,
    data: users,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    total: count
  });
});

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
exports.updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;

  if (!['participant', 'judge', 'admin'].includes(role)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid role'
    });
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  ).select('-password');

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Deactivate/Activate user
// @route   PUT /api/admin/users/:id/status
// @access  Private/Admin
exports.toggleUserStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  user.isActive = !user.isActive;
  await user.save();

  res.status(200).json({
    success: true,
    message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
    data: user
  });
});

// @desc    Get all submissions
// @route   GET /api/admin/submissions
// @access  Private/Admin
exports.getAllSubmissions = asyncHandler(async (req, res) => {
  const { status, category } = req.query;

  let query = {};
  if (status) query.status = status;

  const submissions = await Submission.find(query)
    .populate({
      path: 'project',
      populate: [
        { path: 'team', select: 'name' },
        { path: 'category', select: 'name' }
      ]
    })
    .populate('submittedBy', 'firstName lastName email')
    .sort({ submittedAt: -1 });

  res.status(200).json({
    success: true,
    count: submissions.length,
    data: submissions
  });
});

// @desc    Get/Update hackathon configuration
// @route   GET/PUT /api/admin/hackathon
// @access  Private/Admin
exports.getHackathonConfig = asyncHandler(async (req, res) => {
  let hackathon = await Hackathon.findOne({ isActive: true });

  if (!hackathon) {
    hackathon = await Hackathon.create({});
  }

  res.status(200).json({
    success: true,
    data: hackathon
  });
});

exports.updateHackathonConfig = asyncHandler(async (req, res) => {
  let hackathon = await Hackathon.findOne({ isActive: true });

  if (!hackathon) {
    hackathon = await Hackathon.create(req.body);
  } else {
    hackathon = await Hackathon.findByIdAndUpdate(
      hackathon._id,
      req.body,
      { new: true, runValidators: true }
    );
  }

  res.status(200).json({
    success: true,
    data: hackathon
  });
});

// @desc    Manage categories
// @route   GET/POST /api/admin/categories
// @access  Private/Admin
exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ order: 1 });

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories
  });
});

exports.createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    data: category
  });
});

exports.updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!category) {
    return res.status(404).json({
      success: false,
      message: 'Category not found'
    });
  }

  res.status(200).json({
    success: true,
    data: category
  });
});

exports.deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: 'Category not found'
    });
  }

  // Check if category is used by teams
  const teamsCount = await Team.countDocuments({ category: req.params.id });

  if (teamsCount > 0) {
    return res.status(400).json({
      success: false,
      message: `Cannot delete category. ${teamsCount} teams are using it.`
    });
  }

  await category.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Category deleted successfully'
  });
});

// @desc    Export data
// @route   GET /api/admin/export/:type
// @access  Private/Admin
exports.exportData = asyncHandler(async (req, res) => {
  const { type } = req.params;

  let data;
  let filename;

  switch (type) {
    case 'users':
      data = await User.find().select('-password');
      filename = 'users.json';
      break;
    case 'teams':
      data = await Team.find().populate('leader category');
      filename = 'teams.json';
      break;
    case 'projects':
      data = await Project.find().populate('team category');
      filename = 'projects.json';
      break;
    case 'submissions':
      data = await Submission.find().populate('project team');
      filename = 'submissions.json';
      break;
    default:
      return res.status(400).json({
        success: false,
        message: 'Invalid export type'
      });
  }

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  res.status(200).json({
    success: true,
    data
  });
});

module.exports = exports;