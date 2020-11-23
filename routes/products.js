var express = require('express');
var router = express.Router();
var db = require('monk')('mongodb+srv://ecommerce:ecommerce@cluster0.idq5h.mongodb.net/users?retryWrites=true&w=majority');

router.get('/', function(req, res) {
    var brand = db.get('brands');
    var product = db.get('products');
    product.find({}, {}, function(err, products) {
        brand.find({}, {}, function(err, brands) {
            res.render('products/adidas', {
                brand: brands,
                product: products
            })
        })
    })
});





module.exports = router