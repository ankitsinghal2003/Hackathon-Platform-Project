const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide team name'],
    unique: true,
    trim: true,
    minlength: [3, 'Team name must be at least 3 characters'],
    maxlength: [50, 'Team name cannot exceed 50 characters']
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Team must have a leader']
  },
  members: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      default: 'member'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  inviteCode: {
    type: String,
    unique: true,
    required: true
  },
  maxMembers: {
    type: Number,
    default: 4,
    min: [1, 'Team must have at least 1 member'],
    max: [6, 'Team cannot exceed 6 members']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Please select a category']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  lookingForMembers: {
    type: Boolean,
    default: true
  },
  requiredSkills: [{
    type: String,
    trim: true
  }],
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isQualified: {
    type: Boolean,
    default: true
  },
  disqualificationReason: {
    type: String
  }
}, {
  timestamps: true
});

// Generate unique invite code
teamSchema.pre('save', function(next) {
  if (!this.inviteCode) {
    this.inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  }
  next();
});

// Virtual for member count
teamSchema.virtual('memberCount').get(function() {
  return this.members.length + 1; // +1 for leader
});

// Check if team is full
teamSchema.methods.isFull = function() {
  return this.memberCount >= this.maxMembers;
};

// Check if user is member
teamSchema.methods.isMember = function(userId) {
  const userIdStr = userId.toString();
  if (this.leader.toString() === userIdStr) return true;
  return this.members.some(m => m.user.toString() === userIdStr);
};

// Ensure virtuals are included in JSON
teamSchema.set('toJSON', { virtuals: true });
teamSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Team', teamSchema);