const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  preferredDestination: {
    type: String,
    required: true,
  },
  studyDate: {
    type: String,
    required: true,
  },
  office: {
    type: String,
    required: true,
  },
  counsellingMode: {
    type: String,
    required: true,
  },
  fundingSource: {
    type: String,
    required: true,
  },
  studyLevel: {
    type: String,
    required: true,
  },
  agreeToTerms: {
    type: Boolean,
    required: true,
  },
  contactBy: {
    type: Boolean,
    default: false,
  },
  receiveUpdates: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Form', formSchema);
