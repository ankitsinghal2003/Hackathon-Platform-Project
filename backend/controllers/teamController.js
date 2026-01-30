const Team = require('../models/Team');
const User = require('../models/User');
const Category = require('../models/Category');
const { asyncHandler } = require('../middleware/errorHandler');
const { generateInviteCode } = require('../utils/helpers');
const { sendTeamInviteEmail } = require('../utils/emailService');

// @desc    Create team
// @route   POST /api/teams
// @access  Private
exports.createTeam = asyncHandler(async (req, res) => {
  const { name, category, description, maxMembers, requiredSkills } = req.body;

  // Check if user already has a team
  if (req.user.team) {
    return res.status(400).json({
      success: false,
      message: 'You are already in a team. Leave your current team first.'
    });
  }

  // Verify category exists
  const categoryExists = await Category.findById(category);
  if (!categoryExists) {
    return res.status(404).json({
      success: false,
      message: 'Category not found'
    });
  }

  // Create team
  const team = await Team.create({
    name,
    leader: req.user._id,
    category,
    description,
    maxMembers: maxMembers || 4,
    requiredSkills: requiredSkills || [],
    inviteCode: generateInviteCode()
  });

  // Update user's team
  await User.findByIdAndUpdate(req.user._id, { team: team._id });

  const populatedTeam = await Team.findById(team._id)
    .populate('leader', 'firstName lastName email')
    .populate('category', 'name');

  res.status(201).json({
    success: true,
    data: populatedTeam
  });
});

// @desc    Get all teams
// @route   GET /api/teams
// @access  Public
exports.getTeams = asyncHandler(async (req, res) => {
  const { category, lookingForMembers } = req.query;

  let query = { isActive: true };

  if (category) {
    query.category = category;
  }

  if (lookingForMembers === 'true') {
    query.lookingForMembers = true;
  }

  const teams = await Team.find(query)
    .populate('leader', 'firstName lastName profilePicture')
    .populate('category', 'name icon color')
    .populate('members.user', 'firstName lastName profilePicture')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: teams.length,
    data: teams
  });
});

// @desc    Get single team
// @route   GET /api/teams/:id
// @access  Public
exports.getTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id)
    .populate('leader', 'firstName lastName email profilePicture skills organization')
    .populate('category', 'name description icon color prizeAmount')
    .populate('members.user', 'firstName lastName email profilePicture skills')
    .populate('project', 'title tagline submissionStatus');

  if (!team) {
    return res.status(404).json({
      success: false,
      message: 'Team not found'
    });
  }

  res.status(200).json({
    success: true,
    data: team
  });
});

// @desc    Update team
// @route   PUT /api/teams/:id
// @access  Private (Team Leader)
exports.updateTeam = asyncHandler(async (req, res) => {
  const { name, description, maxMembers, requiredSkills, lookingForMembers } = req.body;

  const fieldsToUpdate = {};
  if (name) fieldsToUpdate.name = name;
  if (description !== undefined) fieldsToUpdate.description = description;
  if (maxMembers) fieldsToUpdate.maxMembers = maxMembers;
  if (requiredSkills) fieldsToUpdate.requiredSkills = requiredSkills;
  if (lookingForMembers !== undefined) fieldsToUpdate.lookingForMembers = lookingForMembers;

  const team = await Team.findByIdAndUpdate(
    req.params.id,
    fieldsToUpdate,
    { new: true, runValidators: true }
  ).populate('leader category members.user');

  res.status(200).json({
    success: true,
    data: team
  });
});

// @desc    Join team with invite code
// @route   POST /api/teams/join
// @access  Private
exports.joinTeam = asyncHandler(async (req, res) => {
  const { inviteCode } = req.body;

  // Check if user already has a team
  if (req.user.team) {
    return res.status(400).json({
      success: false,
      message: 'You are already in a team'
    });
  }

  // Find team by invite code
  const team = await Team.findOne({ inviteCode, isActive: true });

  if (!team) {
    return res.status(404).json({
      success: false,
      message: 'Invalid invite code'
    });
  }

  // Check if team is full
  if (team.isFull()) {
    return res.status(400).json({
      success: false,
      message: 'Team is already full'
    });
  }

  // Add user to team
  team.members.push({
    user: req.user._id,
    role: 'member'
  });

  await team.save();

  // Update user's team
  await User.findByIdAndUpdate(req.user._id, { team: team._id });

  const updatedTeam = await Team.findById(team._id)
    .populate('leader category members.user');

  res.status(200).json({
    success: true,
    message: 'Successfully joined team',
    data: updatedTeam
  });
});

// @desc    Leave team
// @route   DELETE /api/teams/:id/leave
// @access  Private
exports.leaveTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);

  if (!team) {
    return res.status(404).json({
      success: false,
      message: 'Team not found'
    });
  }

  // Check if user is the leader
  if (team.leader.toString() === req.user._id.toString()) {
    return res.status(400).json({
      success: false,
      message: 'Team leader cannot leave. Transfer leadership or delete the team.'
    });
  }

  // Remove user from team
  team.members = team.members.filter(
    member => member.user.toString() !== req.user._id.toString()
  );

  await team.save();

  // Update user's team
  await User.findByIdAndUpdate(req.user._id, { team: null });

  res.status(200).json({
    success: true,
    message: 'Successfully left team'
  });
});

// @desc    Remove member from team
// @route   DELETE /api/teams/:id/members/:userId
// @access  Private (Team Leader)
exports.removeMember = asyncHandler(async (req, res) => {
  const { id: teamId, userId } = req.params;

  const team = await Team.findById(teamId);

  if (!team) {
    return res.status(404).json({
      success: false,
      message: 'Team not found'
    });
  }

  // Cannot remove leader
  if (team.leader.toString() === userId) {
    return res.status(400).json({
      success: false,
      message: 'Cannot remove team leader'
    });
  }

  // Remove member
  team.members = team.members.filter(
    member => member.user.toString() !== userId
  );

  await team.save();

  // Update user's team
  await User.findByIdAndUpdate(userId, { team: null });

  res.status(200).json({
    success: true,
    message: 'Member removed successfully'
  });
});

// @desc    Delete team
// @route   DELETE /api/teams/:id
// @access  Private (Team Leader)
exports.deleteTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);

  if (!team) {
    return res.status(404).json({
      success: false,
      message: 'Team not found'
    });
  }

  // Remove team reference from all members
  const memberIds = [team.leader, ...team.members.map(m => m.user)];
  await User.updateMany(
    { _id: { $in: memberIds } },
    { team: null }
  );

  await team.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Team deleted successfully'
  });
});

// @desc    Get team members
// @route   GET /api/teams/:id/members
// @access  Public
exports.getTeamMembers = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id)
    .populate('leader', 'firstName lastName email profilePicture skills organization')
    .populate('members.user', 'firstName lastName email profilePicture skills');

  if (!team) {
    return res.status(404).json({
      success: false,
      message: 'Team not found'
    });
  }

  const members = [
    {
      ...team.leader.toObject(),
      role: 'leader',
      joinedAt: team.createdAt
    },
    ...team.members.map(m => ({
      ...m.user.toObject(),
      role: m.role,
      joinedAt: m.joinedAt
    }))
  ];

  res.status(200).json({
    success: true,
    count: members.length,
    data: members
  });
});

module.exports = exports;