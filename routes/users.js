var express = require('express');
var router = express.Router();
var passport = require('passport');
var db = require('monk')('mongodb+srv://ecommerce:ecommerce@cluster0.idq5h.mongodb.net/users?retryWrites=true&w=majority');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.redirect('/users/login');
});

router.get('/cart', function(req, res, done) {
    var brand = db.get('brands');
    var product = db.get('products');
    var total = 0;
    var cart = req.session.cart;
    var displayCart = { item: [], total: 0 };
    for (item in cart) {
        displayCart.item.push(cart[item]);
        total += (cart[item].qty * cart[item].price)
    }
    displayCart.total = total;
    product.find({}, {}, function(err, products) {
        brand.find({}, {}, function(err, brands) {
            res.render('pages/cart', {
                brand: brands,
                product: products,
                cart: displayCart
            })
        })
    })
});

router.post('/cart', function(req, res) {
    var product_id = req.body.products_id
    var product = db.get('products');
    req.session.cart = req.session.cart || {};
    var cart = req.session.cart
    product.find({
        _id: product_id
    }, {}, function(err, products) {
        if (cart[product_id]) {
            cart[product_id].qty++;
            res.redirect('/')
        } else {
            products.forEach(function(item) {
                cart[product_id] = {
                    id: item._id,
                    brand: item.brand,
                    name: item.nameproducts,
                    desc: item.desc,
                    price: item.price,
                    img: item.img,
                    qty: 1
                }
            })
            res.redirect('/')
        }
    });


});




module.exports = router;