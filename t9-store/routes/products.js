const router = require('express').Router();
const controller = require('../controllers/products');
const { validateId, validateProduct } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Public routes
router.get('/', controller.getAll);
router.get('/:id', validateId, controller.getSingle);

// Protected routes (Login required)
router.post('/', isAuthenticated, validateProduct, controller.createProduct);
router.put('/:id', isAuthenticated, validateId, validateProduct, controller.updateProduct);
router.delete('/:id', isAuthenticated, validateId, controller.deleteProduct);

module.exports = router;