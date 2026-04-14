const mongoose = require('mongoose');

// MongoDB ID format
const validateId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid ID format.' });
  }
  next();
};

// Product Data (8 fields)
const validateProduct = (req, res, next) => {
  const { 
    category, brand, model, price, 
    stock, description, warranty, releaseDate 
  } = req.body;

  if (!category || !brand || !model || !price || !stock || !description || !warranty || !releaseDate) {
    return res.status(400).json({ error: 'All 8 product fields are required.' });
  }

  if (typeof price !== 'number' || price < 0) {
    return res.status(400).json({ error: 'Price must be a positive number.' });
  }

  next();
};

// Review Data
const validateReview = (req, res, next) => {
  const { productId, userId, rating, comment, date } = req.body;
  if (!productId || !userId || !rating || !comment || !date) {
    return res.status(400).json({ error: 'All review fields are required.' });
  }
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
  }
  next();
};

// User Data
const validateUser = (req, res, next) => {
  const { username, email, password, firstName, lastName } = req.body;
  if (!username || !email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: 'All user fields are required.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }
  next();
};

// Role Data
const validateRole = (req, res, next) => {
  const { roleName, description, permissions } = req.body;
  if (!roleName || !description || !permissions) {
    return res.status(400).json({ error: 'All role fields are required.' });
  }
  next();
};

module.exports = { validateId, validateProduct, validateReview, validateUser, validateRole };