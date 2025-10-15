const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middleware/auth');
const redisCache = require('../middleware/redisCache');

// List/Search Books with Redis cache
router.get('/', redisCache('books'), bookController.listBooks);

// Add Book (Authenticated)
router.post('/', auth, bookController.addBook);

// Edit Book (Authenticated)
router.put('/:id', auth, bookController.editBook);

// Delete Book (Authenticated)
router.delete('/:id', auth, bookController.deleteBook);

module.exports = router;
