const Review = require('../models/reviews');

// GET all reviews
const getAll = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving reviews: ' + err.message });
  }
};

// GET single review by ID
const getSingle = async (req, res) => {
  try {
    const result = await Review.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Review not found with that ID' });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Invalid ID format or server error: ' + err.message });
  }
};

// CREATE new review
const createReview = async (req, res) => {
  try {
    const newReview = new Review(req.body); 
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(400).json({ message: 'Validation failed: ' + err.message });
  }
};

// UPDATE review
const updateReview = async (req, res) => {
  try {
    const updated = await Review.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Cannot update: Review not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: 'Update failed: ' + err.message });
  }
};

// DELETE review
const deleteReview = async (req, res) => {
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Cannot delete: Review not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Delete failed: ' + err.message });
  }
};

module.exports = { 
  getAll, 
  getSingle, 
  createReview, 
  updateReview, 
  deleteReview 
};