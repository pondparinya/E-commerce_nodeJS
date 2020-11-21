var express = require('express');
var router = express.Router();
var passport = require('passport');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.redirect('/users/login');
});




module.exports = router;