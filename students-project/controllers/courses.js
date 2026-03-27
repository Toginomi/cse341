const Course = require('../models/course');

// GET all courses
const getAll = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving courses: ' + err.message });
  }
};

// GET single course by ID
const getSingle = async (req, res) => {
  try {
    const result = await Course.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Invalid ID format: ' + err.message });
  }
};

// CREATE new course
const createCourse = async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (err) {
    res.status(400).json({ message: 'Validation failed: ' + err.message });
  }
};

// UPDATE course
const updateCourse = async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(204).send(); 
  } catch (err) {
    res.status(400).json({ message: 'Update failed: ' + err.message });
  }
};

// DELETE course
const deleteCourse = async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Delete failed: ' + err.message });
  }
};

module.exports = { 
  getAll, 
  getSingle, 
  createCourse, 
  updateCourse, 
  deleteCourse 
};