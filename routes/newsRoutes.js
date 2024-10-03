

// module.exports = router;
const router = require("express").Router();
const {
  createNews,
  getAllNews,
  getSingleNews,
  deleteNews,
  updateNews,
} = require("../controllers/newsController");

router.post("/create", createNews);
router.get("/get_all_news", getAllNews);
router.get("/single-news/:id", getSingleNews);
router.delete("/delete-news/:id", deleteNews);
router.put("/update-news/:id", updateNews);

module.exports = router;
