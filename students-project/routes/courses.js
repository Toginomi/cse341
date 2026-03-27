const router = require('express').Router();
const controller = require('../controllers/courses');
const { validateId, validateCourse } = require('../middleware/validate');

router.get('/', controller.getAll);
router.get('/:id', validateId, controller.getSingle);
router.post('/', validateCourse, controller.createCourse);
router.put('/:id', validateId, validateCourse, controller.updateCourse);
router.delete('/:id', validateId, controller.deleteCourse);

module.exports = router;