const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide hackathon name'],
    default: 'HackFlow 2025'
  },
  tagline: {
    type: String,
    default: 'Where Innovation Meets Intelligence'
  },
  theme: {
    type: String,
    required: [true, 'Please provide hackathon theme'],
    default: 'Building Tomorrow\'s Solutions with AI'
  },
  description: {
    type: String,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  startDate: {
    type: Date,
    required: [true, 'Please provide start date'],
    default: () => new Date('2025-03-01T00:00:00Z')
  },
  endDate: {
    type: Date,
    required: [true, 'Please provide end date'],
    default: () => new Date('2025-03-03T23:59:59Z')
  },
  registrationStartDate: {
    type: Date,
    default: () => new Date('2025-02-01T00:00:00Z')
  },
  registrationEndDate: {
    type: Date,
    default: () => new Date('2025-02-28T23:59:59Z')
  },
  submissionDeadline: {
    type: Date,
    default: () => new Date('2025-03-03T23:59:59Z')
  },
  judgingStartDate: {
    type: Date,
    default: () => new Date('2025-03-04T00:00:00Z')
  },
  judgingEndDate: {
    type: Date,
    default: () => new Date('2025-03-05T23:59:59Z')
  },
  resultsDate: {
    type: Date,
    default: () => new Date('2025-03-06T00:00:00Z')
  },
  status: {
    type: String,
    enum: ['upcoming', 'registration_open', 'ongoing', 'judging', 'completed'],
    default: 'upcoming'
  },
  maxTeamSize: {
    type: Number,
    default: 4,
    min: [1, 'Team size must be at least 1'],
    max: [10, 'Team size cannot exceed 10']
  },
  minTeamSize: {
    type: Number,
    default: 1
  },
  totalPrizePool: {
    type: Number,
    default: 21000
  },
  rules: [{
    title: String,
    description: String,
    order: Number
  }],
  judingCriteria: [{
    name: String,
    description: String,
    weight: Number
  }],
  timeline: [{
    title: String,
    description: String,
    date: Date,
    icon: String
  }],
  sponsors: [{
    name: String,
    logo: String,
    tier: {
      type: String,
      enum: ['platinum', 'gold', 'silver', 'bronze']
    },
    website: String
  }],
  socialMedia: {
    twitter: String,
    linkedin: String,
    discord: String,
    github: String
  },
  contactEmail: {
    type: String,
    default: 'support@hackflow2025.com'
  },
  location: {
    type: String,
    default: 'Virtual'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  settings: {
    allowLateSubmissions: {
      type: Boolean,
      default: false
    },
    allowTeamChanges: {
      type: Boolean,
      default: true
    },
    allowMultipleSubmissions: {
      type: Boolean,
      default: false
    },
    enableLeaderboard: {
      type: Boolean,
      default: true
    },
    enableChat: {
      type: Boolean,
      default: false
    }
  },
  statistics: {
    totalRegistrations: {
      type: Number,
      default: 0
    },
    totalTeams: {
      type: Number,
      default: 0
    },
    totalSubmissions: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Update status based on dates
hackathonSchema.methods.updateStatus = function() {
  const now = new Date();
  
  if (now < this.registrationStartDate) {
    this.status = 'upcoming';
  } else if (now >= this.registrationStartDate && now < this.startDate) {
    this.status = 'registration_open';
  } else if (now >= this.startDate && now < this.submissionDeadline) {
    this.status = 'ongoing';
  } else if (now >= this.judgingStartDate && now < this.judgingEndDate) {
    this.status = 'judging';
  } else if (now >= this.resultsDate) {
    this.status = 'completed';
  }
  
  return this.save();
};

// Get duration in hours
hackathonSchema.virtual('durationHours').get(function() {
  const diff = this.endDate - this.startDate;
  return Math.floor(diff / (1000 * 60 * 60));
});

// Ensure virtuals are included in JSON
hackathonSchema.set('toJSON', { virtuals: true });
hackathonSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Hackathon', hackathonSchema);