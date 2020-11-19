var express = require('express');
var router = express.Router();



router.get('/addidas', function(req, res) {
    res.render('products/addidas')
});
router.get('/balenciaga', function(req, res) {
    res.render('products/balenciaga')
});
router.get('/converse', function(req, res) {
    res.render('products/converse')
});
router.get('/cotton', function(req, res) {
    res.render('products/cotton')
});
router.get('/gucci', function(req, res) {
    res.render('products/gucci')
});
router.get('/nike', function(req, res) {
    res.render('products/nike')
});
router.get('/reebok', function(req, res) {
    res.render('products/reebok')
});
router.get('/vans', function(req, res) {
    res.render('products/vans')
});




module.exports = router