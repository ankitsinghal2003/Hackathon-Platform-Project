const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide category name'],
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Please provide category description'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  icon: {
    type: String,
    default: '🏆'
  },
  color: {
    type: String,
    default: '#6366f1'
  },
  prizeAmount: {
    type: Number,
    required: [true, 'Please provide prize amount'],
    min: [0, 'Prize amount cannot be negative']
  },
  prizeCurrency: {
    type: String,
    default: 'USD'
  },
  additionalBenefits: [{
    type: String
  }],
  criteria: [{
    name: String,
    description: String,
    weight: {
      type: Number,
      min: 0,
      max: 100
    }
  }],
  maxTeams: {
    type: Number,
    default: null // null means unlimited
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Generate slug before saving
categorySchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Category', categorySchema);