const Contact = require('../models/contact');

const getAll = async (req, res) => {
  // #swagger.summary = 'Get all contacts'
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  // #swagger.summary = 'Get contact by ID'
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createContact = async (req, res) => {
  // #swagger.summary = 'Create a new contact'
  const contact = new Contact({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  });
  try {
    const response = await contact.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateContact = async (req, res) => {
  // #swagger.summary = 'Update a contact by ID'
  try {
    const response = await Contact.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true } 
    );

    if (!response) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(204).send(); 
    } catch (err) {
      console.log("FULL ERROR LOG:", err);
      res.status(500).json({ message: err.message });
  }
};

const deleteContact = async (req, res) => {
  // #swagger.summary = 'Delete a contact by ID'
  try {
    const response = await Contact.findByIdAndDelete(req.params.id);
    if (!response) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { 
  getAll, 
  getSingle, 
  createContact, 
  updateContact, 
  deleteContact 
};