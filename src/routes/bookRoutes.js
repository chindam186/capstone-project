const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middleware/auth');

// List/Search Books
router.get('/', bookController.listBooks);

// Add Book (Authenticated)
router.post('/', auth, bookController.addBook);

// Edit Book (Authenticated)
router.put('/:id', auth, bookController.editBook);

// Delete Book (Authenticated)
router.delete('/:id', auth, bookController.deleteBook);

module.exports = router;
