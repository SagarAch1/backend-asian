// Importing mongoose package
const mongoose = require("mongoose");

// Creating a schema
const discountSchema = new mongoose.Schema({
  couponName: {
    type: String,
    required: true,
  },
  couponType: {
    type: String,
    required: true,
  },
  couponImage: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Creating a model
const Discount = mongoose.model("discounts", discountSchema);

// Exporting the model
module.exports = Discount;
