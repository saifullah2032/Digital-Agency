const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
      lowercase: true,
    },
    mobileNumber: {
      type: String,
      required: [true, 'Please provide your mobile number'],
      validate: {
        validator: function (value) {
          return /^[\d\s\-\+\(\)]+$/.test(value) && value.replace(/\D/g, '').length >= 10;
        },
        message: 'Please provide a valid mobile number (at least 10 digits)',
      },
    },
    city: {
      type: String,
      required: [true, 'Please provide your city'],
      trim: true,
      maxlength: [50, 'City cannot be more than 50 characters'],
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model('Contact', contactSchema);
