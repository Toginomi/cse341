const router = require('express').Router();
const controller = require('../controllers/students');
const { validateId, validateStudent } = require('../middleware/validate');

router.get('/', controller.getAll);
router.get('/:id', validateId, controller.getSingle);
router.post('/', validateStudent, controller.createStudent);
router.put('/:id', validateId, validateStudent, controller.updateStudent);
router.delete('/:id', validateId, controller.deleteStudent);

module.exports = router;