const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/auth');

// Add Review to Book
router.post('/books/:id/reviews', auth, reviewController.addReview);

// List Reviews for Book
router.get('/books/:id/reviews', reviewController.listReviews);

// Edit Review (by review author or admin)
router.put('/reviews/:reviewId', auth, reviewController.editReview);

// Delete Review (by review author or admin)
router.delete('/reviews/:reviewId', auth, reviewController.deleteReview);

module.exports = router;
