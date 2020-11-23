var express = require('express');
var router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');
var passport = require('passport');
const { isAdmin } = require('../config/auth');
var db = require('monk')('mongodb+srv://ecommerce:ecommerce@cluster0.idq5h.mongodb.net/users?retryWrites=true&w=majority');



/* GET home page. */


router.get('/', function(req, res) {
    var brand = db.get('brands');
    var product = db.get('products');
    product.find({}, {}, function(err, products) {
        brand.find({}, {}, function(err, brands) {
            res.render('pages/index', {
                brand: brands,
                product: products
            })
        })
    })
});
////////////////////////////////////////////////////////////////////////
// Login Page
router.get('/login', (req, res, next) => {
    res.render('pages/login', { title: "LOGIN" });
});

router.post('/login', passport.authenticate('local', {
        // successRedirect: '/',
        failureRedirect: '/users/login'
    }),
    function(req, res) {
        var admin = req.user.admin
        if (admin == 1) {
            res.redirect('/admin')
        } else {
            res.redirect('/')
        }

    }
);
router.get('/logout', function(req, res, next) {
    req.logOut();
    res.redirect('/')
});
////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////
// Register Page
router.get('/register', (req, res, next) => {
    res.render('pages/register');
});

router.post('/register', function(req, res, next) {
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
    });

    res.redirect('/login')
});
////////////////////////////////////////////////////////////////////////

router.get('/:brand', function(req, res) {
    var brand = db.get('brands');
    var product = db.get('products');
    product.find({ brand: req.params.brand }, {}, function(err, products) {
        brand.find({}, {}, function(err, brands) {
            res.render('pages/products', {
                brand: brands,
                product: products,
            })
        })
    })
});

router.get('/cart', (req, res, next) => {
    res.render('pages/cart');
});


module.exports = router;