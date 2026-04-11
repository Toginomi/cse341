const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));
router.use('/students', require('./students'));
router.use('/courses', require('./courses'));

// Authentication Routes
router.get('/login', passport.authenticate('github', (req, res) => {}));

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/api-docs');
  });
});

router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', 
  session: true
}), (req, res) => {
  req.session.user = req.user; // Store user profile in session
  res.redirect('/api-docs');
});

module.exports = router;