// Importing mongoose package
const mongoose = require("mongoose");

// Creating mongoDB Schema
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin : {
    type: Boolean,
    default: false
  },
  resetPasswordOTP : {
    type : Number,
    default: null
  },
  resetPasswordExpiry : {
    type : Date,
    default: null
  }
});

// Creating mongoDB model
const User = mongoose.model("users_test", userSchema);

// Expoting User module
module.exports = User;
  