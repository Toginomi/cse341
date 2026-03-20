const mongoose = require('mongoose');

const validateId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid ID format.' });
  }
  next();
};

const validateStudent = (req, res, next) => {
  const { studentName, currentSchool, parentGuardian, parentContact, email, address } = req.body;
  if (!studentName || !currentSchool || !parentGuardian || !parentContact || !email || !address) {
    return res.status(400).json({ error: 'All required fields must be filled.' });
  }
  // Optional: Add Email Regex check here
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }
  next();
};

module.exports = { validateId, validateStudent };