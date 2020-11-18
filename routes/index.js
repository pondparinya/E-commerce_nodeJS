var express = require('express');
var router = express.Router();
const User = require('../models/model');
const bcrypt = require('bcryptjs');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('pages/index');
});

router.get('/login', (req, res, next) => {
    res.render('pages/login');
});

router.get('/cart', (req, res, next) => {
    res.render('pages/cart');
})

router.get('/woman_clothes', (req, res, next) => {
    res.render('pages/woman_clothes');
})

router.get('/men_clothes', (req, res, next) => {
    res.render('pages/men_clothes');
})

router.get('/woman_pants', (req, res, next) => {
    res.render('pages/woman_pants');
})

router.get('/men_pants', (req, res, next) => {
        res.render('pages/men_pants');
    })
    // Register Page
router.get('/register', (req, res, next) => {
    res.render('pages/register');
});

router.post('/login', function(req, res, next) {
    var { username, email, password } = req.body
    var newuser = new User({
        username: username,
        email: email,
        password: password
    });
    // เข้ารหัสพาสเวิด แล้วค่อยเอาไปเก็บใน DB
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newuser.password, salt, function(err, hash) {
            newuser.password = hash;
            newuser.save();
        })
    })

    res.redirect('/')
});

router.get('/woman_shoes', (req, res, next) => {
    res.render('pages/woman_shoes');
})

router.get('/men_shoes', (req, res, next) => {
    res.render('pages/men_shoes');
})


router.post('/login', function(req, res) {
    console.log(req.body.username)
})
module.exports = router;