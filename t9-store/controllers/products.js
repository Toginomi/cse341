const Product = require('../models/products');

// GET all products
const getAll = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving products: ' + err.message });
  }
};

// GET single product by ID
const getSingle = async (req, res) => {
  try {
    const result = await Product.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Product not found with that ID' });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Invalid ID format or server error: ' + err.message });
  }
};

// CREATE new product
const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body); 
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: 'Validation failed: ' + err.message });
  }
};

// UPDATE product
const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Cannot update: Product not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: 'Update failed: ' + err.message });
  }
};

// DELETE product
const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Cannot delete: Product not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Delete failed: ' + err.message });
  }
};

module.exports = { 
  getAll, 
  getSingle, 
  createProduct, 
  updateProduct, 
  deleteProduct 
};