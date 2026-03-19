const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');
const { 
    validateId, 
    validateFirstName, 
    validateLastName, 
    validateEmail, 
    validateFavoriteColor, 
    validateBirthday 
} = require('../middleware/validate');

// GET all contacts
router.get('/', contactsController.getAll);

// GET a single contact by ID
router.get('/:id', validateId, contactsController.getSingle);

// POST - Create a new contact
router.post('/', contactsController.createContact);

// PUT - Update a contact by ID
router.put('/:id', 
    validateId, 
    validateFirstName, 
    validateLastName, 
    validateEmail, 
    validateFavoriteColor, 
    validateBirthday, 
    contactsController.updateContact
);

// DELETE - Remove a contact by ID
router.delete('/:id', validateId, contactsController.deleteContact);

module.exports = router;