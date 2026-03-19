const mongoose = require('mongoose');

const validateId = (req, res, next) => {
    console.log('Validating ID:', req.params.id);
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid ID format. Must be a 24-character hex string.'})
    }
    next();
};

const validateFirstName = (req, res, next) => {
    const { firstName } = req.body;

    if (!firstName || !/^[A-Za-z\s]{2,}$/.test(firstName)){
        return res.status(400).json({ error: 'First name must contain only letters and be at least 2 characters long.'});
    }
    next();
};

const validateLastName = (req, res, next) => {
    const { lastName } = req.body;

    if (!lastName || !/^[A-Za-z\s]{2,}$/.test(lastName)){
        return res.status(400).json({ error: 'Last name must contain only letters and be at least 2 characters long.'})
    }
    next();
};

const validateEmail = (req, res, next) => {
    const { email } = req.body;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        return res.status(400).json({ error: 'Invalid email format.' })
    }
    next();
};

const validateFavoriteColor = (req, res, next) => {
    const { favoriteColor } = req.body;

    if (!/^[A-Za-z|\s]+$/.test(favoriteColor)){
        return res.status(400).json({ error: 'Favorite color must contain only letters, at least 2 characters long.'})
    }
    next();
};

const validateBirthday = (req, res, next) => {
    const { birthday } = req.body;

    if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(birthday)){
        return res.status(400).json({ error: 'Birthday must be in YYYY-MM-DD format.'})
    }
    next();
};


module.exports = { validateId, validateFirstName, validateLastName, validateEmail, validateFavoriteColor, validateBirthday };