const mongoose = require('mongoose');

const clientProjectSchema = new mongoose.Schema({
  clientEmail: {
    type: String,
    required: true,
    index: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['planning', 'in-progress', 'review', 'completed', 'on-hold'],
    default: 'planning',
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  estimatedCompletion: {
    type: Date,
  },
  technologies: [String],
  team: [
    {
      name: String,
      role: String,
      avatar: String,
    },
  ],
  milestones: [
    {
      title: String,
      description: String,
      completed: { type: Boolean, default: false },
      completedDate: Date,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
clientProjectSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('ClientProject', clientProjectSchema);
