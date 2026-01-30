const User = require('../models/User');
const Team = require('../models/Team');
const { asyncHandler } = require('../middleware/errorHandler');
const { getPagination, formatPaginationResponse } = require('../utils/helpers');

// @desc    Get user profile
// @route   GET /api/users/profile/:id
// @access  Public
exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select('-password')
    .populate('team', 'name category inviteCode');

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Get all users (with pagination)
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query.page, req.query.limit);
  const { role, search } = req.query;

  // Build query
  let query = {};
  
  if (role) {
    query.role = role;
  }

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
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(query);

  res.status(200).json({
    success: true,
    ...formatPaginationResponse(users, total, page, limit)
  });
});

// @desc    Get user statistics
// @route   GET /api/users/stats
// @access  Private
exports.getUserStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId).populate('team');
  
  let stats = {
    profile: {
      completeness: 0,
      missing: []
    },
    team: null,
    submissions: 0,
    evaluations: 0
  };

  // Calculate profile completeness
  const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'organization', 'bio', 'skills'];
  const completedFields = requiredFields.filter(field => user[field] && user[field].length > 0);
  stats.profile.completeness = Math.round((completedFields.length / requiredFields.length) * 100);
  stats.profile.missing = requiredFields.filter(field => !user[field] || user[field].length === 0);

  // Get team info
  if (user.team) {
    stats.team = {
      id: user.team._id,
      name: user.team.name,
      memberCount: user.team.memberCount,
      isLeader: user.team.leader.toString() === userId.toString()
    };
  }

  // Get submissions count
  if (user.team) {
    const Project = require('../models/Project');
    stats.submissions = await Project.countDocuments({ team: user.team._id });
  }

  res.status(200).json({
    success: true,
    data: stats
  });
});

// @desc    Search users
// @route   GET /api/users/search
// @access  Private
exports.searchUsers = asyncHandler(async (req, res) => {
  const { q, limit = 10 } = req.query;

  if (!q) {
    return res.status(400).json({
      success: false,
      message: 'Search query is required'
    });
  }

  const users = await User.find({
    $or: [
      { firstName: { $regex: q, $options: 'i' } },
      { lastName: { $regex: q, $options: 'i' } },
      { email: { $regex: q, $options: 'i' } }
    ],
    isActive: true
  })
  .select('firstName lastName email profilePicture organization')
  .limit(parseInt(limit));

  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

// @desc    Delete user account
// @route   DELETE /api/users/account
// @access  Private
exports.deleteAccount = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Check if user is team leader
  const team = await Team.findOne({ leader: userId });
  if (team) {
    return res.status(400).json({
      success: false,
      message: 'Cannot delete account while being a team leader. Please transfer leadership first.'
    });
  }

  // Remove user from team if member
  if (req.user.team) {
    await Team.findByIdAndUpdate(req.user.team, {
      $pull: { members: { user: userId } }
    });
  }

  // Delete user
  await User.findByIdAndDelete(userId);

  res.status(200).json({
    success: true,
    message: 'Account deleted successfully'
  });
});

module.exports = exports;