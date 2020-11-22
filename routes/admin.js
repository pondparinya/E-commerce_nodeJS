var express = require('express');
var router = express.Router();
const User = require('../models/users');
var passport = require('passport');
const { isAdmin } = require('../config/auth');
var db = require('monk')('mongodb+srv://ecommerce:ecommerce@cluster0.idq5h.mongodb.net/users?retryWrites=true&w=majority');



router.get('/', isAdmin, function(req, res) {
    res.redirect('/')
});

router.get('/addproducts', isAdmin, function(req, res) {
    res.render('pages/add_products');
})

router.post('/addproducts', isAdmin, function(req, res, next) {
    var products = db.get('products');
    products.insert({
        brand: req.body.brand,
        nameproducts: req.body.nameproducts,
        desc: req.body.desc,
        price: parseFloat(req.body.price).toFixed(2),
        size: parseFloat(req.body.size).toFixed(1),
        img: req.body.img

    }, function(err) {
        if (err) {
            console.log("noo")
        }
        res.redirect('/admin/addproducts')
    })
})


module.exports = router;