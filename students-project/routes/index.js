const router = require('express').Router();
router.use('/api-docs', require('./swagger'));
router.use('/students', require('./students'));

module.exports = router;