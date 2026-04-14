const User = require('../models/users');

// GET all users
const getAll = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users: ' + err.message });
  }
};

// GET single user by ID
const getSingle = async (req, res) => {
  try {
    const result = await User.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'User not found with that ID' });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Invalid ID format or server error: ' + err.message });
  }
};

// CREATE new user
const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body); 
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: 'Validation failed: ' + err.message });
  }
};

// UPDATE user
const updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Cannot update: User not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: 'Update failed: ' + err.message });
  }
};

// DELETE user
const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Cannot delete: User not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Delete failed: ' + err.message });
  }
};

module.exports = { 
  getAll, 
  getSingle, 
  createUser, 
  updateUser, 
  deleteUser 
};