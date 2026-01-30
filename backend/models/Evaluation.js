const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, 'Evaluation must be for a project']
  },
  judge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Evaluation must have a judge']
  },
  scores: {
    innovation: {
      score: {
        type: Number,
        required: [true, 'Innovation score is required'],
        min: [0, 'Score cannot be less than 0'],
        max: [10, 'Score cannot exceed 10']
      },
      weight: {
        type: Number,
        default: 25 // 25%
      }
    },
    technical: {
      score: {
        type: Number,
        required: [true, 'Technical complexity score is required'],
        min: [0, 'Score cannot be less than 0'],
        max: [10, 'Score cannot exceed 10']
      },
      weight: {
        type: Number,
        default: 25 // 25%
      }
    },
    implementation: {
      score: {
        type: Number,
        required: [true, 'Implementation score is required'],
        min: [0, 'Score cannot be less than 0'],
        max: [10, 'Score cannot exceed 10']
      },
      weight: {
        type: Number,
        default: 25 // 25%
      }
    },
    impact: {
      score: {
        type: Number,
        required: [true, 'Impact score is required'],
        min: [0, 'Score cannot be less than 0'],
        max: [10, 'Score cannot exceed 10']
      },
      weight: {
        type: Number,
        default: 25 // 25%
      }
    }
  },
  totalScore: {
    type: Number,
    default: 0
  },
  weightedScore: {
    type: Number,
    default: 0
  },
  feedback: {
    strengths: {
      type: String,
      maxlength: [1000, 'Strengths cannot exceed 1000 characters']
    },
    improvements: {
      type: String,
      maxlength: [1000, 'Improvements cannot exceed 1000 characters']
    },
    generalComments: {
      type: String,
      maxlength: [2000, 'General comments cannot exceed 2000 characters']
    }
  },
  recommendation: {
    type: String,
    enum: ['highly_recommend', 'recommend', 'neutral', 'not_recommend'],
    default: 'neutral'
  },
  isComplete: {
    type: Boolean,
    default: false
  },
  submittedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Calculate total and weighted scores before saving
evaluationSchema.pre('save', function(next) {
  const { innovation, technical, implementation, impact } = this.scores;
  
  // Calculate total score (out of 40)
  this.totalScore = innovation.score + technical.score + implementation.score + impact.score;
  
  // Calculate weighted score (out of 100)
  this.weightedScore = (
    (innovation.score / 10) * innovation.weight +
    (technical.score / 10) * technical.weight +
    (implementation.score / 10) * implementation.weight +
    (impact.score / 10) * impact.weight
  );
  
  // Mark as complete if all scores are provided
  if (innovation.score && technical.score && implementation.score && impact.score) {
    this.isComplete = true;
    if (!this.submittedAt) {
      this.submittedAt = new Date();
    }
  }
  
  next();
});

// Prevent duplicate evaluations (one judge per project)
evaluationSchema.index({ project: 1, judge: 1 }, { unique: true });

module.exports = mongoose.model('Evaluation', evaluationSchema);