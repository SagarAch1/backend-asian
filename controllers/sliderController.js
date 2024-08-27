const path = require("path");
const fs = require("fs");
const Slider = require("../models/sliderModel");

const createSlider = async (req, res) => {
  const { sliderName, sliderType } = req.body;

  if (!sliderName || !sliderType) {
    return res.status(400).json({
      success: false,
      message: "Please enter all the required fields",
    });
  }

  if (!req.files || !req.files.sliderImage) {
    return res.status(400).json({
      success: false,
      message: "Please upload an image of the slider",
    });
  }

  const { sliderImage } = req.files;
  const imageName = `${Date.now()}-${sliderImage.name}`;
  const imageUploadPath = path.join(
    __dirname,
    `../public/sliders/${imageName}`
  );

  try {
    await sliderImage.mv(imageUploadPath);

    const newSlider = new Slider({
      sliderName,
      sliderType,
      sliderImage: imageName,
    });

    const slider = await newSlider.save();

    res.status(201).json({
      success: true,
      message: "Slider created successfully!",
      data: slider,
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

const getAllSliders = async (req, res) => {
  try {
    const allSliders = await Slider.find({});
    res.status(200).json({
      success: true,
      message: "All sliders fetched successfully!",
      sliders: allSliders,
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

const getSingleSlider = async (req, res) => {
  const sliderId = req.params.id;

  try {
    const slider = await Slider.findById(sliderId);
    if (!slider) {
      return res.status(400).json({
        success: false,
        message: "Slider not found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Slider fetched successfully!",
      slider: slider,
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

const deleteSlider = async (req, res) => {
  try {
    const slider = await Slider.findByIdAndDelete(req.params.id);
    if (!slider) {
      return res.status(404).json({
        success: false,
        message: "Slider not found!",
      });
    }

    const oldImagePath = path.join(
      __dirname,
      `../public/sliders/${slider.sliderImage}`
    );
    fs.unlinkSync(oldImagePath);

    return res.status(200).json({
      success: true,
      message: "Slider deleted successfully!",
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

const updateSlider = async (req, res) => {
  try {
    if (req.files && req.files.sliderImage) {
      const { sliderImage } = req.files;
      const imageName = `${Date.now()}-${sliderImage.name}`;
      const imageUploadPath = path.join(
        __dirname,
        `../public/sliders/${imageName}`
      );

      await sliderImage.mv(imageUploadPath);

      req.body.sliderImage = imageName;

      const existingSlider = await Slider.findById(req.params.id);
      const oldImagePath = path.join(
        __dirname,
        `../public/sliders/${existingSlider.sliderImage}`
      );
      fs.unlinkSync(oldImagePath);
    }

    const updatedSlider = await Slider.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Slider updated successfully!",
      data: updatedSlider,
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
  createSlider,
  getAllSliders,
  getSingleSlider,
  deleteSlider,
  updateSlider,
};
