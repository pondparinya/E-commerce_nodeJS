var express = require('express');
var router = express.Router();
var passport = require('passport');
var { check, validationResult } = require('express-validator')
const { isAdmin } = require('../config/auth');
const modelPro = require('../models/products')
var db = require('monk')('mongodb+srv://ecommerce:ecommerce@cluster0.idq5h.mongodb.net/users?retryWrites=true&w=majority');
router.get('/', isAdmin, function(req, res) {
    var brand = db.get('brands');
    brand.find({}, {}, function(err, brands) {
        res.render('pages/index', { brand: brands });
    });
});

//////////////////////////////////////////////////
// เพิ่มสินค้า
router.get('/addproducts', isAdmin, function(req, res) {
    var brand = db.get('brands');
    brand.find({}, {}, function(err, brands) {
        res.render('admin_pages/add_products', { brand: brands });
    })
})

router.post('/addproducts', isAdmin, function(req, res, done) {
    var products = db.get('products')
    products.insert({
        brand: req.body.brand,
        nameproducts: req.body.nameproducts,
        price: parseFloat(req.body.price).toFixed(2),
        size: parseFloat(req.body.size).toFixed(1),
        img: req.body.img
    }, function(err, product) {
        if (err) {
            console.log('Nooo')
        }
        if (product) {
            // return done(null, product)
            res.redirect('/admin/addproducts')
        }
    })
});
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// เพิ่ม ยี่ห้อสินค้า
router.get('/addbrand', isAdmin, function(req, res) {
    res.render('admin_pages/addbrand');
});

router.post('/addbrand', [check('brandname', 'Please fill in the information').not().isEmpty()], function(req, res) {
    var result = validationResult(req);
    var errors = result.errors;
    var brand = db.get('brands')
    if (!result.isEmpty()) {
        res.render('admin_pages/addbrand', { errors: errors });
    } else {
        // Insert DB
        brand.insert({
            brand: req.body.brandname
        }, function(err, suc) {
            if (err) {
                res.send(err)
            } else {
                res.location('/')
                res.redirect('/')
            }
        })
    }
});


router.get('/del', function(req, res) {
    var products = db.get('products');
    modelPro.find({}, {}, function(err, pro) {
        res.render('admin_pages/del_products', { product: pro })
    })
});

router.post('/del', function(req, res) {
    var products_id = req.body.product_id
    modelPro.deleteOne({
        _id: products_id
    }, function(err, pro) {
        res.redirect('/admin/del')
    })
});
//////////////////////////////////////////////////




module.exports = router;