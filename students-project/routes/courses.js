const router = require('express').Router();
const controller = require('../controllers/courses');
const { validateId, validateCourse } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Public routes
router.get('/', controller.getAll);
router.get('/:id', validateId, controller.getSingle);

// Protected routes (Login required)
router.post('/', isAuthenticated, validateCourse, controller.createCourse);
router.put('/:id', isAuthenticated, validateId, validateCourse, controller.updateCourse);
router.delete('/:id', isAuthenticated, validateId, controller.deleteCourse);

module.exports = router;