const path = require("path");
const fs = require("fs");
const Gallery = require("../models/galleryModel");

const createGallery = async (req, res) => {
  const { galleryName, galleryType } = req.body;

  if (!galleryName || !galleryType) {
    return res.status(400).json({
      success: false,
      message: "Please enter all the required fields",
    });
  }

  if (!req.files || !req.files.galleryImages) {
    return res.status(400).json({
      success: false,
      message: "Please upload images for the gallery",
    });
  }

  try {
    const galleryImages = [];

    // Handle multiple file uploads
    const imageFiles = req.files.galleryImages;
    const files = Array.isArray(imageFiles) ? imageFiles : [imageFiles]; // Handle single and multiple files

    // Upload each image
    for (const image of files) {
      const imageName = `${Date.now()}-${image.name}`;
      const imageUploadPath = path.join(__dirname, `../public/gallery/${imageName}`);
      await image.mv(imageUploadPath);
      galleryImages.push(imageName); // Store the uploaded image name
    }

    const newGallery = new Gallery({
      galleryName,
      galleryType,
      galleryImages,
    });

    const gallery = await newGallery.save();

    res.status(201).json({
      success: true,
      message: "Gallery created successfully!",
      data: gallery,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: error.message,
    });
  }
};

const getAllGallery = async (req, res) => {
  try {
    const allGallery = await Gallery.find({});
    res.status(200).json({
      success: true,
      message: "All galleries fetched successfully!",
      gallery: allGallery,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: error.message,
    });
  }
};

const getSingleGallery = async (req, res) => {
  const galleryId = req.params.id;

  try {
    const gallery = await Gallery.findById(galleryId);
    if (!gallery) {
      return res.status(400).json({
        success: false,
        message: "Gallery not found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Gallery fetched successfully!",
      gallery: gallery,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: error.message,
    });
  }
};

const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);
    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found!",
      });
    }

    // Delete all images related to the gallery
    gallery.galleryImages.forEach((image) => {
      const oldImagePath = path.join(__dirname, `../public/gallery/${image}`);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    });

    return res.status(200).json({
      success: true,
      message: "Gallery deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: error.message,
    });
  }
};

const updateGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found!",
      });
    }

    if (req.files && req.files.galleryImages) {
      const galleryImages = [];

      // Handle multiple file uploads
      const imageFiles = req.files.galleryImages;
      const files = Array.isArray(imageFiles) ? imageFiles : [imageFiles];

      // Upload new images and delete old ones
      files.forEach(async (image) => {
        const imageName = `${Date.now()}-${image.name}`;
        const imageUploadPath = path.join(__dirname, `../public/gallery/${imageName}`);
        await image.mv(imageUploadPath);
        galleryImages.push(imageName);
      });

      // Delete old images
      gallery.galleryImages.forEach((image) => {
        const oldImagePath = path.join(__dirname, `../public/gallery/${image}`);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      });

      req.body.galleryImages = galleryImages;
    }

    const updatedGallery = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Gallery updated successfully!",
      data: updatedGallery,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: error.message,
    });
  }
};

module.exports = {
  createGallery,
  getAllGallery,
  getSingleGallery,
  deleteGallery,
  updateGallery,
};
