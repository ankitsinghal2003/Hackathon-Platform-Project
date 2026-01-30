const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: [true, 'Submission must belong to a team']
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, 'Submission must have a project']
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Submission must have a submitter']
  },
  version: {
    type: Number,
    default: 1
  },
  status: {
    type: String,
    enum: ['pending', 'submitted', 'under_review', 'evaluated', 'disqualified'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  isLate: {
    type: Boolean,
    default: false
  },
  evaluationCount: {
    type: Number,
    default: 0
  },
  averageScore: {
    type: Number,
    default: 0
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  adminNotes: {
    type: String
  }
}, {
  timestamps: true
});

// Check if submission is late
submissionSchema.pre('save', async function(next) {
  if (this.isNew) {
    const Hackathon = mongoose.model('Hackathon');
    const hackathon = await Hackathon.findOne({ isActive: true });
    
    if (hackathon && this.submittedAt > hackathon.submissionDeadline) {
      this.isLate = true;
    }
  }
  next();
});

// Ensure one submission per team
submissionSchema.index({ team: 1, version: 1 }, { unique: true });

module.exports = mongoose.model('Submission', submissionSchema);