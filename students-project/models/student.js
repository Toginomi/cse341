const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  major: { type: String, required: true },
  gpa: { type: Number, required: true },
  admissionDate: { type: String, required: true },
  totalCredits: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);