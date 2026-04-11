const router = require('express').Router();
const controller = require('../controllers/students');
const { validateId, validateStudent } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Public routes
router.get('/', controller.getAll);
router.get('/:id', validateId, controller.getSingle);

// Protected routes (Login required)
router.post('/', isAuthenticated, validateStudent, controller.createStudent);
router.put('/:id', isAuthenticated, validateId, validateStudent, controller.updateStudent);
router.delete('/:id', isAuthenticated, validateId, controller.deleteStudent);

module.exports = router;