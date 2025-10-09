// List books (admin, with search/filter/sort)
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const upload = require('../middleware/upload');

router.get('/admin/books', auth, admin, adminController.listBooks);




// Upload book image (admin only)
router.post('/admin/books/:id/image', auth, admin, upload.single('image'), (req, res) => {
	if (!req.file) {
		return res.status(400).json({ message: 'No image uploaded' });
	}
	res.json({ message: 'Image uploaded', filename: req.file.filename });
});

// List users
router.get('/admin/users', auth, admin, adminController.listUsers);
// Update user
router.put('/admin/users/:id', auth, admin, adminController.updateUser);
// Delete user
router.delete('/admin/users/:id', auth, admin, adminController.deleteUser);
// Delete review
router.delete('/admin/reviews/:id', auth, admin, adminController.deleteReview);
// Moderate book (delete)
router.delete('/admin/books/:id', auth, admin, adminController.deleteBook);

module.exports = router;
