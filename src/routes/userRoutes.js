const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

const passwordPolicy = [
  body('password')
    .isLength({ min: parseInt(process.env.PASSWORD_MIN_LENGTH), max: parseInt(process.env.PASSWORD_MAX_LENGTH) })
    .withMessage(`Password must be between ${process.env.PASSWORD_MIN_LENGTH} and ${process.env.PASSWORD_MAX_LENGTH} characters`)
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('Password must contain at least one special character'),
];

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Valid email required'),
    ...passwordPolicy,
    body('age').isInt({ min: 1 }).withMessage('Valid age required'),
    body('address.house').notEmpty().withMessage('House required'),
    body('address.city').notEmpty().withMessage('City required'),
    body('address.state').notEmpty().withMessage('State required'),
    body('address.pin').notEmpty().withMessage('Pin required'),
  ],
  userController.register
);
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required'),
  ],
  userController.login
);


// View user profile (GET)
router.get('/profile', auth, userController.getProfile);

// Update user profile (PUT)
router.put('/profile', auth, userController.updateProfile);

module.exports = router;
