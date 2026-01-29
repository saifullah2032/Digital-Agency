const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  clientEmail: {
    type: String,
    required: true,
    index: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClientProject',
    index: true,
  },
  projectName: String,
  type: {
    type: String,
    enum: ['message', 'file_upload', 'file_delete', 'status_change', 'milestone_update', 'team_update', 'comment'],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  actor: {
    type: String,
    default: 'System',
  },
  actorRole: {
    type: String,
    enum: ['admin', 'client', 'team_member'],
    default: 'admin',
  },
  metadata: {
    fileName: String,
    fileSize: Number,
    oldStatus: String,
    newStatus: String,
    milestoneTitle: String,
    teamMemberName: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound index for faster queries
activitySchema.index({ clientEmail: 1, createdAt: -1 });
activitySchema.index({ projectId: 1, createdAt: -1 });

module.exports = mongoose.model('Activity', activitySchema);
