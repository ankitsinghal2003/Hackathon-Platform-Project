const { body, param, query, validationResult } = require('express-validator');

// Handle validation errors
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

// User registration validation
exports.registerValidation = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 2, max: 50 }).withMessage('First name must be 2-50 characters'),
  
  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Last name must be 2-50 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('confirmPassword')
    .notEmpty().withMessage('Please confirm your password')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match')
];

// Login validation
exports.loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required')
];

// Team creation validation
exports.createTeamValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Team name is required')
    .isLength({ min: 3, max: 50 }).withMessage('Team name must be 3-50 characters'),
  
  body('category')
    .notEmpty().withMessage('Category is required')
    .isMongoId().withMessage('Invalid category ID'),
  
  body('description')
    .optional()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  
  body('maxMembers')
    .optional()
    .isInt({ min: 1, max: 6 }).withMessage('Max members must be between 1 and 6')
];

// Project submission validation
exports.projectSubmissionValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Project title is required')
    .isLength({ min: 5, max: 100 }).withMessage('Title must be 5-100 characters'),
  
  body('tagline')
    .trim()
    .notEmpty().withMessage('Tagline is required')
    .isLength({ max: 200 }).withMessage('Tagline cannot exceed 200 characters'),
  
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 50, max: 5000 }).withMessage('Description must be 50-5000 characters'),
  
  body('problemStatement')
    .trim()
    .notEmpty().withMessage('Problem statement is required')
    .isLength({ max: 2000 }).withMessage('Problem statement cannot exceed 2000 characters'),
  
  body('solution')
    .trim()
    .notEmpty().withMessage('Solution is required')
    .isLength({ max: 2000 }).withMessage('Solution cannot exceed 2000 characters'),
  
  body('technologies')
    .optional()
    .isArray().withMessage('Technologies must be an array'),
  
  body('demoUrl')
    .optional()
    .isURL().withMessage('Please provide a valid demo URL'),
  
  body('githubUrl')
    .optional()
    .isURL().withMessage('Please provide a valid GitHub URL')
    .matches(/github\.com/).withMessage('Must be a GitHub URL')
];

// Evaluation validation
exports.evaluationValidation = [
  body('project')
    .notEmpty().withMessage('Project ID is required')
    .isMongoId().withMessage('Invalid project ID'),
  
  body('scores.innovation.score')
    .notEmpty().withMessage('Innovation score is required')
    .isFloat({ min: 0, max: 10 }).withMessage('Innovation score must be 0-10'),
  
  body('scores.technical.score')
    .notEmpty().withMessage('Technical score is required')
    .isFloat({ min: 0, max: 10 }).withMessage('Technical score must be 0-10'),
  
  body('scores.implementation.score')
    .notEmpty().withMessage('Implementation score is required')
    .isFloat({ min: 0, max: 10 }).withMessage('Implementation score must be 0-10'),
  
  body('scores.impact.score')
    .notEmpty().withMessage('Impact score is required')
    .isFloat({ min: 0, max: 10 }).withMessage('Impact score must be 0-10'),
  
  body('feedback.generalComments')
    .optional()
    .isLength({ max: 2000 }).withMessage('Comments cannot exceed 2000 characters')
];

// MongoDB ID validation
exports.idValidation = [
  param('id')
    .isMongoId().withMessage('Invalid ID format')
];

// Pagination validation
exports.paginationValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
];