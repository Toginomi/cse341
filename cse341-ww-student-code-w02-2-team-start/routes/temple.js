const routes = require('express').Router();
const temples = require('../controllers/temple.js');

// --- GET ROUTES ---
routes.get('/:temple_id', temples.findOne);
routes.get('/', temples.findAll);
routes.get('/published', temples.findAllPublished);


// --- POST ROUTES ---
routes.post('/', temples.create);


// --- PUT ROUTES ---
routes.put('/:id', temples.update);


// --- DELETE ROUTES ---
routes.delete('/:id', temples.delete);
routes.delete('/', temples.deleteAll);

module.exports = routes;