var express = require('express');
var router = express.Router();
const model = require('../config/passport');
var passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/login', function(req, res) {
    res.redirect('/login')
});

router.get('/logout', function(req, res, next) {
    req.logOut();
    res.redirect('/')
});
router.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login'
    }),
    function(req, res) {}
)

module.exports = router;