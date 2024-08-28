const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  
  email: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  budget: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Book', bookSchema);
