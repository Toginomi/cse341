const router = require('express').Router();
const controller = require('../controllers/reviews');
const { validateId, validateReview } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Public routes
router.get('/', controller.getAll);
router.get('/:id', validateId, controller.getSingle);

// Protected routes (Login required)
router.post('/', isAuthenticated, validateReview, controller.createReview);
router.put('/:id', isAuthenticated, validateId, validateReview, controller.updateReview);
router.delete('/:id', isAuthenticated, validateId, controller.deleteReview);

module.exports = router;