// galleryModel.js
const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    galleryName: {
      type: String,
      required: true,
    },
    galleryType: {
      type: String,
      required: true,
    },
    galleryImages: {
      type: [String], // Array of strings for image URLs
      required: true,
    },
  },
  { timestamps: true }
);

const GalleryDB = mongoose.model("Gallery", gallerySchema);
module.exports = GalleryDB;
