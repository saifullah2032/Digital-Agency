const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide project title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide project description'],
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Please provide project image URL'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Project', projectSchema);
