const express = require('express');
const router = express.Router();
const Book = require('./book');

// Retrieve all books
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Retrieve a specific book by ID
router.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new book
router.post('/books', async (req, res) => {
  const { title, author, description, publishedYear } = req.body;
  try {
    const book = new Book({ title, author, description, publishedYear });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a book by ID
router.put('/books/:id', async (req, res) => {
  const { title, author, description, publishedYear } = req.body;
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, description, publishedYear },
      { new: true }
    );
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a book by ID
router.delete('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports
