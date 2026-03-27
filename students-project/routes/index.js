const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/students', require('./students'));
router.use('/courses', require('./courses'));

module.exports = router;