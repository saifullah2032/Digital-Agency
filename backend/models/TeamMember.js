const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ['project_manager', 'developer', 'designer', 'qa_engineer', 'devops', 'other'],
    required: true,
  },
  department: String,
  phone: String,
  avatar: String,
  bio: String,
  skills: [String],
  
  // Permissions
  permissions: {
    canViewProjects: { type: Boolean, default: true },
    canEditProjects: { type: Boolean, default: false },
    canManageTeam: { type: Boolean, default: false },
    canViewMessages: { type: Boolean, default: true },
    canSendMessages: { type: Boolean, default: true },
    canUploadFiles: { type: Boolean, default: true },
    canDeleteFiles: { type: Boolean, default: false },
    canViewAnalytics: { type: Boolean, default: false },
  },

  // Assignment
  assignedProjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClientProject',
  }],

  // Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'on_leave'],
    default: 'active',
  },

  joinDate: {
    type: Date,
    default: Date.now,
  },

  lastActiveAt: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster queries
teamMemberSchema.index({ email: 1 });
teamMemberSchema.index({ role: 1 });
teamMemberSchema.index({ status: 1 });

module.exports = mongoose.model('TeamMember', teamMemberSchema);
