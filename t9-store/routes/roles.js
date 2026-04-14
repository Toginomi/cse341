const router = require('express').Router();
const controller = require('../controllers/roles');
const { validateId, validateRole } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Public routes
router.get('/', controller.getAll);
router.get('/:id', validateId, controller.getSingle);

// Protected routes (Login required)
router.post('/', isAuthenticated, validateRole, controller.createRole);
router.put('/:id', isAuthenticated, validateId, validateRole, controller.updateRole);
router.delete('/:id', isAuthenticated, validateId, controller.deleteRole);

module.exports = router;