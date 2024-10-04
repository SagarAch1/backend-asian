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

  if (!req.files || !req.files.galleryImage) {
    return res.status(400).json({
      success: false,
      message: "Please upload an image of the gallery",
    });
  }

  const { galleryImage } = req.files;
  const imageName = `${Date.now()}-${galleryImage.name}`;
  const imageUploadPath = path.join(
    __dirname,
    `../public/gallery/${imageName}`
  );

  try {
    await galleryImage.mv(imageUploadPath);

    const newGallery = new Gallery({
      galleryName,
      galleryType,
      galleryImages: imageName,
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
      message: "All gallery fetched successfully!",
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

    const oldImagePath = path.join(
      __dirname,
      `../public/gallery/${gallery.galleryImage}`
    );
    fs.unlinkSync(oldImagePath);

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
    if (req.files && req.files.galleryImage) {
      const { galleryImage } = req.files;
      const imageName = `${Date.now()}-${galleryImage.name}`;
      const imageUploadPath = path.join(
        __dirname,
        `../public/gallery/${imageName}`
      );

      await galleryImage.mv(imageUploadPath);

      req.body.galleryImage = imageName;

      const existingGallery = await Gallery.findById(req.params.id);
      const oldImagePath = path.join(
        __dirname,
        `../public/gallery/${existingGallery.galleryImage}`
      );
      fs.unlinkSync(oldImagePath);
    }

    const updatedGallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

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
