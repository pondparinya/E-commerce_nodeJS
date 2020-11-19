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
    // Register Page
router.get('/register', (req, res, next) => {
    res.render('pages/register');
});
router.get('/shopcart', (req, res, next) => {
    res.render('partials/shopcart');
});

// router.get('/balenciaga', (req, res, next) => {
//     res.render('products/balenciaga');
// });

router.post('/test', function (req,res){
    res.render('products/vans');
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

    res.redirect('users/login')
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