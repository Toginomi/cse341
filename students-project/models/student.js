const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  studentName: { type: String, required: true },
  currentSchool: { type: String, required: true },
  parentGuardian: { type: String, required: true },
  parentContact: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  studentFbLink: { type: String, required: false },
  parentFbLink: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);