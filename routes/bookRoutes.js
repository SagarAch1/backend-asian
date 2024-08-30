const express = require('express');
const router = express.Router();
const { createBook, getAllBook } = require('../controllers/bookController');

// Route to create a new book message
router.post('/create', createBook);

// Route to get all book messages
router.get('/get_all_book', getAllBook);

module.exports = router;