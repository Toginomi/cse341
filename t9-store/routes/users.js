const router = require('express').Router();
const controller = require('../controllers/users');
const { validateId, validateUser } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Public routes
router.get('/', controller.getAll);
router.get('/:id', validateId, controller.getSingle);

// Protected routes (Login required)
router.post('/', isAuthenticated, validateUser, controller.createUser);
router.put('/:id', isAuthenticated, validateId, validateUser, controller.updateUser);
router.delete('/:id', isAuthenticated, validateId, controller.deleteUser);

module.exports = router;