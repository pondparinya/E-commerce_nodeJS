var express = require('express');
var router = express.Router();
var passport = require('passport');
var db = require('monk')('mongodb+srv://ecommerce:ecommerce@cluster0.idq5h.mongodb.net/users?retryWrites=true&w=majority');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.redirect('/users/login');
});

router.get('/cart', function(req, res) {
    var brand = db.get('brands');
    var product = db.get('products');
    product.find({}, {}, function(err, products) {
        brand.find({}, {}, function(err, brands) {
            res.render('pages/cart', {
                brand: brands,
                product: products
            })
        })
    })
});

router.post('/cart', function(req, res) {


    res.redirect('/')
})
module.exports = router;