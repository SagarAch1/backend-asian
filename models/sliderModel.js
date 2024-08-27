const mongoose = require("mongoose");

const sliderSchema = new mongoose.Schema({
  sliderName: {
    type: String,
    required: true,
  },
  sliderType: {
    type: String,
    required: true,
  },
  sliderImage: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Slider = mongoose.model("Slider", sliderSchema);

module.exports = Slider;
