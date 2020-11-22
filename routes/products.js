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

router.get('/adidas', function(req, res) {
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
router.get('/balenciaga', function(req, res) {
    var products = db.get('products');
    products.find({}, {}, function(err, product) {
        res.render('products/balenciaga', {
            products: product
        });
    })

});
router.get('/converse', function(req, res) {
    var products = db.get('products');
    products.find({}, {}, function(err, product) {
        res.render('products/converse', {
            products: product
        });
    })

});
router.get('/amiri', function(req, res) {
    var products = db.get('products');
    products.find({}, {}, function(err, product) {
        res.render('products/amiri', {
            products: product
        });
    })

});
router.get('/gucci', function(req, res) {
    var products = db.get('products');
    products.find({}, {}, function(err, product) {
        res.render('products/gucci', {
            products: product
        });
    })

});
router.get('/nike', function(req, res) {
    var products = db.get('products');
    products.find({}, {}, function(err, product) {
        res.render('products/nike', {
            products: product
        });
    })

});
router.get('/reebok', function(req, res) {
    var products = db.get('products');
    products.find({}, {}, function(err, product) {
        res.render('products/reebok', {
            products: product
        });
    })

});
router.get('/vans', function(req, res) {
    var products = db.get('products');
    products.find({}, {}, function(err, product) {
        res.render('products/vans', {
            products: product
        });
    })

});






module.exports = router