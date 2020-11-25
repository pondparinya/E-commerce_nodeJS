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
//////////////////////////////////////////////////
// router.post('/addproducts', isAdmin, function(req, res, done) {
//     brands = req.body.brand
//     nameproducts = req.body.nameproducts
//     desc = req.body.desc
//     price = parseFloat(req.body.price).toFixed(2)
//     img = req.body.img
//     size = size.body.size
//     modelPro.findOne({ brand: brand },function())
//     var newproduct = new modelPro({
//         brand: brands,
//         nameproducts: nameproducts,
//         desc: desc,
//         price: price,
//         size: size,
//         img: img
//     })
//     newproduct.save()
//     res.redirect('/')
// })

module.exports = router;