const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  courseCode: { type: String, required: true },
  courseName: { type: String, required: true },
  instructor: { type: String, required: true },
  credits: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);