const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide project title'],
    trim: true,
    minlength: [5, 'Title must be at least 5 characters'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  tagline: {
    type: String,
    required: [true, 'Please provide a tagline'],
    maxlength: [200, 'Tagline cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide project description'],
    minlength: [50, 'Description must be at least 50 characters'],
    maxlength: [5000, 'Description cannot exceed 5000 characters']
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: [true, 'Project must belong to a team']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Please select a category']
  },
  technologies: [{
    type: String,
    trim: true
  }],
  problemStatement: {
    type: String,
    required: [true, 'Please describe the problem you are solving'],
    maxlength: [2000, 'Problem statement cannot exceed 2000 characters']
  },
  solution: {
    type: String,
    required: [true, 'Please describe your solution'],
    maxlength: [2000, 'Solution cannot exceed 2000 characters']
  },
  features: [{
    type: String,
    trim: true
  }],
  demoUrl: {
    type: String,
    trim: true,
    match: [
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
      'Please provide a valid URL'
    ]
  },
  videoUrl: {
    type: String,
    trim: true,
    match: [
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
      'Please provide a valid URL'
    ]
  },
  githubUrl: {
    type: String,
    trim: true,
    match: [
      /^(https?:\/\/)?(www\.)?github\.com\/[\w-]+\/[\w-]+\/?$/,
      'Please provide a valid GitHub URL'
    ]
  },
  files: [{
    filename: String,
    path: String,
    size: Number,
    mimetype: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  screenshots: [{
    type: String
  }],
  submissionStatus: {
    type: String,
    enum: ['draft', 'submitted', 'under_review', 'reviewed'],
    default: 'draft'
  },
  submittedAt: {
    type: Date
  },
  evaluations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evaluation'
  }],
  totalScore: {
    type: Number,
    default: 0
  },
  averageScore: {
    type: Number,
    default: 0
  },
  rank: {
    type: Number,
    default: null
  },
  isWinner: {
    type: Boolean,
    default: false
  },
  prize: {
    position: String,
    amount: Number,
    description: String
  }
}, {
  timestamps: true
});

// Update submission status to submitted
projectSchema.methods.submit = function() {
  this.submissionStatus = 'submitted';
  this.submittedAt = new Date();
  return this.save();
};

// Calculate average score
projectSchema.methods.calculateAverageScore = function() {
  if (this.evaluations.length === 0) {
    this.averageScore = 0;
    return;
  }
  this.averageScore = this.totalScore / this.evaluations.length;
  return this.save();
};

// Index for searching
projectSchema.index({ title: 'text', description: 'text', tagline: 'text' });

module.exports = mongoose.model('Project', projectSchema);