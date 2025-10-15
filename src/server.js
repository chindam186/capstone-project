
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Rate limiter middleware
const rateLimiter = require('./middleware/rateLimiter');
app.use(rateLimiter);

// Routes
app.use('/api/users', require('./routes/userRoutes'));
const bookRoutes = require('./routes/bookRoutes');
app.use('/api/books', bookRoutes);
const reviewRoutes = require('./routes/reviewRoutes');
app.use('/api', reviewRoutes);
const adminRoutes = require('./routes/adminRoutes');
app.use('/api', adminRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/book_catalog';

if (require.main === module) {
  mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('MongoDB connected');
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
    });
}

module.exports = app;

module.exports = app;
