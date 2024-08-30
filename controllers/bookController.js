const Book = require('../models/bookModel'); 

// Function to create a new book message
exports.createBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json({ message: 'Book message created successfully', data: newBook });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create book message', error });
  }
};

// Function to get all book messages
exports.getAllBook = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ message: 'Books retrieved successfully', data: books });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve books', error });
  }
};