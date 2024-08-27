const express = require("express");
const { searchItems } = require("../controllers/itemController");
const router = express.Router();

// Search route
router.get("/search", searchItems);

module.exports = router;
