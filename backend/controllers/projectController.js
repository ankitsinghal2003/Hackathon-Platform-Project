const Project = require('../models/Project');
const Team = require('../models/Team');
const Submission = require('../models/Submission');
const { asyncHandler } = require('../middleware/errorHandler');
const { sendSubmissionConfirmationEmail } = require('../utils/emailService');

// @desc    Create/Submit project
// @route   POST /api/projects
// @access  Private (Team Member)
exports.createProject = asyncHandler(async (req, res) => {
  const {
    title, tagline, description, technologies,
    problemStatement, solution, features,
    demoUrl, videoUrl, githubUrl
  } = req.body;

  // Check if user has a team
  if (!req.user.team) {
    return res.status(400).json({
      success: false,
      message: 'You must be part of a team to submit a project'
    });
  }

  const team = await Team.findById(req.user.team).populate('category');

  // Check if team already has a project
  if (team.project) {
    return res.status(400).json({
      success: false,
      message: 'Your team already has a project submission'
    });
  }

  //Handle file uploads
  const files = [];
  const screenshots = [];

  if (req.files) {
    if (req.files.projectFiles) {
      req.files.projectFiles.forEach(file => {
        files.push({
          filename: file.originalname,
          path: `/uploads/projects/${file.filename}`,
          size: file.size,
          mimetype: file.mimetype
        });
      });
    }

    if (req.files.screenshots) {
      req.files.screenshots.forEach(file => {
        screenshots.push(`/uploads/projects/${file.filename}`);
      });
    }
  }

  // Create project
  const project = await Project.create({
    title,
    tagline,
    description,
    team: team._id,
    category: team.category._id,
    technologies,
    problemStatement,
    solution,
    features,
    demoUrl,
    videoUrl,
    githubUrl,
    files,
    screenshots,
    submissionStatus: 'draft'
  });

  // Update team with project
  team.project = project._id;
  await team.save();

  res.status(201).json({
    success: true,
    data: project
  });
});

// @desc    Submit project (finalize)
// @route   POST /api/projects/:id/submit
// @access  Private (Team Member)
exports.submitProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate('team');

  if (!project) {
    return res.status(404).json({
      success: false,
      message: 'Project not found'
    });
  }

  // Verify user is team member
  if (project.team._id.toString() !== req.user.team?.toString()) {
    return res.status(403).json({
      success: false,
      message: 'You are not authorized to submit this project'
    });
  }

  // Submit project
  await project.submit();

  // Create submission record
  await Submission.create({
    team: project.team._id,
    project: project._id,
    submittedBy: req.user._id,
    status: 'submitted'
  });

  // Send confirmation email
  try {
    await sendSubmissionConfirmationEmail(req.user, project, project.team);
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
  }

  res.status(200).json({
    success: true,
    message: 'Project submitted successfully',
    data: project
  });
});

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
exports.getProjects = asyncHandler(async (req, res) => {
  const { category, status, search } = req.query;

  let query = {};

  if (category) query.category = category;
  if (status) query.submissionStatus = status;
  if (search) {
    query.$text = { $search: search };
  }

  const projects = await Project.find(query)
    .populate('team', 'name')
    .populate('category', 'name icon color')
    .sort({ averageScore: -1, submittedAt: -1 });

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects
  });
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
exports.getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate('team')
    .populate('category')
    .populate({
      path: 'evaluations',
      populate: { path: 'judge', select: 'firstName lastName' }
    });

  if (!project) {
    return res.status(404).json({
      success: false,
      message: 'Project not found'
    });
  }

  res.status(200).json({
    success: true,
    data: project
  });
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Team Member)
exports.updateProject = asyncHandler(async (req, res) => {
  let project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({
      success: false,
      message: 'Project not found'
    });
  }

  // Check if already submitted
  if (project.submissionStatus === 'submitted') {
    return res.status(400).json({
      success: false,
      message: 'Cannot update a submitted project'
    });
  }

  project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: project
  });
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Team Leader)
exports.deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({
      success: false,
      message: 'Project not found'
    });
  }

  await project.deleteOne();

  // Update team
  await Team.findByIdAndUpdate(project.team, { project: null });

  res.status(200).json({
    success: true,
    message: 'Project deleted successfully'
  });
});

module.exports = exports;