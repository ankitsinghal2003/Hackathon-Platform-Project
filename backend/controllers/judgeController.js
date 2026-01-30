const Project = require('../models/Project');
const Evaluation = require('../models/Evaluation');
const { asyncHandler } = require('../middleware/errorHandler');
const { sendEvaluationCompletedEmail } = require('../utils/emailService');

// @desc    Get projects for evaluation
// @route   GET /api/judge/projects
// @access  Private (Judge)
exports.getProjectsForEvaluation = asyncHandler(async (req, res) => {
  const { category, evaluated } = req.query;

  let query = { submissionStatus: 'submitted' };

  if (category) {
    query.category = category;
  }

  const projects = await Project.find(query)
    .populate('team', 'name')
    .populate('category', 'name icon color')
    .sort({ submittedAt: 1 });

  // Filter based on evaluation status
  if (evaluated === 'true') {
    const evaluatedProjects = [];
    for (const project of projects) {
      const evaluation = await Evaluation.findOne({
        project: project._id,
        judge: req.user._id
      });
      if (evaluation) {
        evaluatedProjects.push({
          ...project.toObject(),
          myEvaluation: evaluation
        });
      }
    }
    return res.status(200).json({
      success: true,
      count: evaluatedProjects.length,
      data: evaluatedProjects
    });
  } else if (evaluated === 'false') {
    const unevaluatedProjects = [];
    for (const project of projects) {
      const evaluation = await Evaluation.findOne({
        project: project._id,
        judge: req.user._id
      });
      if (!evaluation) {
        unevaluatedProjects.push(project);
      }
    }
    return res.status(200).json({
      success: true,
      count: unevaluatedProjects.length,
      data: unevaluatedProjects
    });
  }

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects
  });
});

// @desc    Submit evaluation
// @route   POST /api/judge/evaluate
// @access  Private (Judge)
exports.submitEvaluation = asyncHandler(async (req, res) => {
  const { project, scores, feedback, recommendation } = req.body;

  // Check if project exists
  const projectDoc = await Project.findById(project).populate('team');

  if (!projectDoc) {
    return res.status(404).json({
      success: false,
      message: 'Project not found'
    });
  }

  // Check if already evaluated by this judge
  const existingEvaluation = await Evaluation.findOne({
    project,
    judge: req.user._id
  });

  if (existingEvaluation) {
    return res.status(400).json({
      success: false,
      message: 'You have already evaluated this project'
    });
  }

  // Create evaluation
  const evaluation = await Evaluation.create({
    project,
    judge: req.user._id,
    scores,
    feedback,
    recommendation
  });

  // Update project
  projectDoc.evaluations.push(evaluation._id);
  projectDoc.totalScore += evaluation.weightedScore;
  await projectDoc.calculateAverageScore();
  projectDoc.submissionStatus = 'under_review';
  await projectDoc.save();

  // Send email notification
  try {
    const teamLeader = await User.findById(projectDoc.team.leader);
    await sendEvaluationCompletedEmail(
      teamLeader,
      projectDoc,
      projectDoc.averageScore
    );
  } catch (error) {
    console.error('Failed to send evaluation email:', error);
  }

  res.status(201).json({
    success: true,
    message: 'Evaluation submitted successfully',
    data: evaluation
  });
});

// @desc    Get my evaluations
// @route   GET /api/judge/my-evaluations
// @access  Private (Judge)
exports.getMyEvaluations = asyncHandler(async (req, res) => {
  const evaluations = await Evaluation.find({ judge: req.user._id })
    .populate({
      path: 'project',
      populate: [
        { path: 'team', select: 'name' },
        { path: 'category', select: 'name' }
      ]
    })
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: evaluations.length,
    data: evaluations
  });
});

// @desc    Update evaluation
// @route   PUT /api/judge/evaluate/:id
// @access  Private (Judge)
exports.updateEvaluation = asyncHandler(async (req, res) => {
  let evaluation = await Evaluation.findOne({
    _id: req.params.id,
    judge: req.user._id
  });

  if (!evaluation) {
    return res.status(404).json({
      success: false,
      message: 'Evaluation not found'
    });
  }

  const oldScore = evaluation.weightedScore;

  evaluation = await Evaluation.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  // Update project score
  const project = await Project.findById(evaluation.project);
  project.totalScore = project.totalScore - oldScore + evaluation.weightedScore;
  await project.calculateAverageScore();
  await project.save();

  res.status(200).json({
    success: true,
    data: evaluation
  });
});

// @desc    Get judge statistics
// @route   GET /api/judge/stats
// @access  Private (Judge)
exports.getJudgeStats = asyncHandler(async (req, res) => {
  const totalProjects = await Project.countDocuments({
    submissionStatus: { $in: ['submitted', 'under_review', 'reviewed'] }
  });

  const myEvaluations = await Evaluation.countDocuments({
    judge: req.user._id
  });

  const pending = totalProjects - myEvaluations;

  const stats = {
    totalProjects,
    evaluated: myEvaluations,
    pending,
    completionRate: totalProjects > 0 ? ((myEvaluations / totalProjects) * 100).toFixed(2) : 0
  };

  res.status(200).json({
    success: true,
    data: stats
  });
});

module.exports = exports;