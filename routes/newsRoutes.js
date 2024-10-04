const router = require("express").Router();
const {
  createNews,
  getAllNews,
  getSingleNews,
  deleteNews,
  updateNews,
} = require("../controllers/newsController");

// Middleware to validate MongoDB ObjectId (Optional)
const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid news ID!",
    });
  }
  next();
};

// Routes
router.post("/create", createNews);
router.get("/get_all_news", getAllNews);
router.get("/news/:id", validateObjectId, getSingleNews); // Apply middleware to check id
router.delete("/news/:id", validateObjectId, deleteNews); // Apply middleware to check id
router.put("/news/:id", validateObjectId, updateNews); // Apply middleware to check id

module.exports = router;
