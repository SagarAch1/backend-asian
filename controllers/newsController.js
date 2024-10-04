const path = require("path");
const fs = require("fs").promises; // Use promises for file handling
const News = require("../models/newsModel");

// Helper function to delete image file
const deleteImage = async (imagePath) => {
  try {
    await fs.unlink(imagePath);
  } catch (err) {
    console.error(`Failed to delete image at ${imagePath}:`, err.message);
  }
};

const createNews = async (req, res) => {
  const { newsName, newsLink, newsDate } = req.body;

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
    await newsImage.mv(imageUploadPath);

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
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while creating news!",
      error: error.message,
    });
  }
};

const getAllNews = async (req, res) => {
    console.log("Fetching all news..."); // Log to verify the function is called
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

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(newsId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid news ID!",
    });
  }

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
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching the news!",
      error: error.message,
    });
  }
};

const deleteNews = async (req, res) => {
  const newsId = req.params.id;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(newsId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid news ID!",
    });
  }

  try {
    const news = await News.findByIdAndDelete(newsId);
    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found!",
      });
    }

    const oldImagePath = path.join(__dirname, `../public/news/${news.newsImage}`);
    await deleteImage(oldImagePath);

    return res.status(200).json({
      success: true,
      message: "News deleted successfully!",
      deletedNews: news,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while deleting news!",
      error: error.message,
    });
  }
};

const updateNews = async (req, res) => {
  const newsId = req.params.id;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(newsId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid news ID!",
    });
  }

  try {
    // Handle image update
    if (req.files && req.files.newsImage) {
      const { newsImage } = req.files;
      const imageName = `${Date.now()}-${newsImage.name}`;
      const imageUploadPath = path.join(__dirname, `../public/news/${imageName}`);

      await newsImage.mv(imageUploadPath);
      req.body.newsImage = imageName;

      // Delete old image
      const existingNews = await News.findById(newsId);
      if (existingNews) {
        const oldImagePath = path.join(__dirname, `../public/news/${existingNews.newsImage}`);
        await deleteImage(oldImagePath);
      }
    }

    const updatedNews = await News.findByIdAndUpdate(newsId, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "News updated successfully!",
      data: updatedNews,
    });
  } catch (error) {
    console.error(error);
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
