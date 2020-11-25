var express = require('express');
var router = express.Router();
var passport = require('passport');
var { isUser } = require('../config/auth')
const modelPro = require('../models/products')
const _ = require('lodash')
var db = require('monk')('mongodb+srv://ecommerce:ecommerce@cluster0.idq5h.mongodb.net/users?retryWrites=true&w=majority');
/* GET users listing. */
router.get('/', isUser, function(req, res, next) {
    res.redirect('/');
});


router.get('/:brand', function(req, res) {
    var brand = db.get('brands');
    var pro = db.get('products');
    var total = 0;
    var Brand = req.params.brand;
    var cart = req.session.cart
    var displayCart = { item: [] };
    for (item in cart) {
        displayCart.item.push(cart[item]);
    }
    pro.find({ brand: Brand }, {}, function(err, products) {
        brand.find({}, {}, function(err, brands) {
            // var Uni = _.uniqBy(brands, "brand")
            res.render('pages/products', {
                product: products,
                brand: brands,
                cart: displayCart
            });
        })
    })
});



// router.get('/cart', function(req, res, done) {
//     var brand = db.get('brands');
//     var total = 0;
//     var cart = req.session.cart;
//     var displayCart = { item: [], total: 0 };
//     for (item in cart) {
//         displayCart.item.push(cart[item]);
//         total += (cart[item].qty * cart[item].price)
//     }
//     displayCart.total = total;
//     brand.find({}, {}, function(err, brands) {
//         res.render('pages/cart', {
//             brand: brands,
//             cart: displayCart
//         })
//     })
// })

router.post('/cart', function(req, res) {
    var product_id = req.body.products_id
    var sizereq = req.body.size
    var namereq = req.body.nameproducts
    var product = db.get('products');
    req.session.cart = req.session.cart || {};
    var cart = req.session.cart
    product.find({
        _id: product_id
    }, {}, function(err, products) {
        if (cart[product_id]) {
            cart[product_id].qty++
                res.redirect('/')
        } else {
            products.forEach(function(item) {
                cart[product_id] = {
                    id: item._id,
                    brand: item.brand,
                    name: item.nameproducts,
                    price: item.price,
                    img: item.img,
                    size: sizereq,
                    qty: 1
                }
            })
            res.redirect('/')
        }
    })
});





module.exports = router;