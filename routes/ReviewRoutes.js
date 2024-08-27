const express = require("express");
const { getReviews, submitReview } = require("../controllers/ReviewController");
const {  authGuard } = require("../middleware/authGaurd");

const router = express.Router();

router.get("/:productId", getReviews);
router.post("/", authGuard, submitReview);

module.exports = router;
