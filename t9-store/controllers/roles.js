const Role = require('../models/roles');

// GET all roles
const getAll = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving roles: ' + err.message });
  }
};

// GET single role by ID
const getSingle = async (req, res) => {
  try {
    const result = await Role.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Role not found with that ID' });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Invalid ID format or server error: ' + err.message });
  }
};

// CREATE new role
const createRole = async (req, res) => {
  try {
    const newRole = new Role(req.body); 
    const savedRole = await newRole.save();
    res.status(201).json(savedRole);
  } catch (err) {
    res.status(400).json({ message: 'Validation failed: ' + err.message });
  }
};

// UPDATE role
const updateRole = async (req, res) => {
  try {
    const updated = await Role.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Cannot update: Role not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: 'Update failed: ' + err.message });
  }
};

// DELETE role
const deleteRole = async (req, res) => {
  try {
    const deleted = await Role.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Cannot delete: Role not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Delete failed: ' + err.message });
  }
};

module.exports = { 
  getAll, 
  getSingle, 
  createRole, 
  updateRole, 
  deleteRole 
};