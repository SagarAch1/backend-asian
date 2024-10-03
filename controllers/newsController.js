const path = require("path");
const fs = require("fs");
const News = require("../models/newsModel");

const createNews = async (req, res) => {
  const { newsName, newsLink, newsDate } = req.body; // Include newsDate

  if (!newsName || !newsLink || !newsDate) {
    return res.status(400).json({
      success: false,
      message: "Please enter all the required fields",
    });
  }

  if (!req.files || !req.files.newsImage) {
    return res.status(400).json({
      success: false,
      message: "Please upload an image of the news",
    });
  }

  const { newsImage } = req.files;
  const imageName = `${Date.now()}-${newsImage.name}`;
  const imageUploadPath = path.join(__dirname, `../public/news/${imageName}`);

  try {
    await newsImage.mv(imageUploadPath); // Handle potential errors during file move

    const newNews = new News({
      newsName,
      newsLink,
      newsDate,
      newsImage: imageName,
    });

    const news = await newNews.save();

    res.status(201).json({
      success: true,
      message: "News created successfully!",
      data: news,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while creating news!",
      error: error.message,
    });
  }
};

const getAllNews = async (req, res) => {
  try {
    const allNews = await News.find({});
    res.status(200).json({
      success: true,
      message: "All news fetched successfully!",
      news: allNews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching news!",
      error: error.message,
    });
  }
};

const getSingleNews = async (req, res) => {
  const newsId = req.params.id;

  try {
    const news = await News.findById(newsId);
    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "News fetched successfully!",
      news,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching the news!",
      error: error.message,
    });
  }
};

const deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found!",
      });
    }

    const oldImagePath = path.join(__dirname, `../public/news/${news.newsImage}`);
    fs.unlink(oldImagePath, (err) => {
      if (err) {
        console.error("Failed to delete old image:", err);
      }
    });

    return res.status(200).json({
      success: true,
      message: "News deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while deleting news!",
      error: error.message,
    });
  }
};

const updateNews = async (req, res) => {
  try {
    if (req.files && req.files.newsImage) {
      const { newsImage } = req.files;
      const imageName = `${Date.now()}-${newsImage.name}`;
      const imageUploadPath = path.join(__dirname, `../public/news/${imageName}`);

      await newsImage.mv(imageUploadPath);

      req.body.newsImage = imageName;

      const existingNews = await News.findById(req.params.id);
      if (existingNews) {
        const oldImagePath = path.join(__dirname, `../public/news/${existingNews.newsImage}`);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Failed to delete old image:", err);
          }
        });
      }
    }

    const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "News updated successfully!",
      data: updatedNews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while updating news!",
      error: error.message,
    });
  }
};

module.exports = {
  createNews,
  getAllNews,
  getSingleNews,
  deleteNews,
  updateNews,
};
