const mongoose = require('mongoose');

// MongoDB ID format
const validateId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid ID format.' });
  }
  next();
};

// Student Data
const validateStudent = (req, res, next) => {
  const { 
    firstName, lastName, email, age, 
    major, gpa, admissionDate, totalCredits 
  } = req.body;

  // Check if all required fields exist
  if (!firstName || !lastName || !email || !age || !major || !gpa || !admissionDate || !totalCredits) {
    return res.status(400).json({ error: 'All 8 student fields are required.' });
  }

  // Email 
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  // GPA 
  if (gpa < 0 || gpa > 4.0) {
    return res.status(400).json({ error: 'GPA must be between 0.0 and 4.0' });
  }

  next();
};

// Course
const validateCourse = (req, res, next) => {
  const { courseCode, courseName, instructor, credits } = req.body;
  if (!courseCode || !courseName || !instructor || !credits) {
    return res.status(400).json({ error: 'All course fields are required.' });
  }
  next();
};

module.exports = { validateId, validateStudent, validateCourse };