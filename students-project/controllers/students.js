const Student = require('../models/student');

// GET all students
const getAll = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving students: ' + err.message });
  }
};

// GET single student by ID
const getSingle = async (req, res) => {
  try {
    const result = await Student.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Student not found with that ID' });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Invalid ID format or server error: ' + err.message });
  }
};

// CREATE new student
const createStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body); 
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ message: 'Validation failed: ' + err.message });
  }
};

// UPDATE student
const updateStudent = async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Cannot update: Student not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: 'Update failed: ' + err.message });
  }
};

// DELETE student
const deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Cannot delete: Student not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Delete failed: ' + err.message });
  }
};

module.exports = { 
  getAll, 
  getSingle, 
  createStudent, 
  updateStudent, 
  deleteStudent 
};