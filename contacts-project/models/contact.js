const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    firstName: { type: String, required: [true, 'First name is required'] },
    lastName: { type: String, required: [true, 'Last name is required'] },
    email: { type: String, required: [true, 'Email is required'], unique: true },
    favoriteColor: { type: String, required: [true, 'Favorite color is required'] },
    birthday: { type: Date, required: [true, 'Birthday is required'] }
});

module.exports = mongoose.model('Contact', contactSchema);