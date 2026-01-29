const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide client name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    designation: {
      type: String,
      required: [true, 'Please provide client designation'],
      trim: true,
      maxlength: [100, 'Designation cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide testimonial text'],
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Please provide client image URL'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Client', clientSchema);
