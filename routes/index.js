var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('pages/index', { title: 'Express' });
});

router.get('/login', (req, res, next) => {
    res.render('pages/login');
});

router.get('/cart', (req, res, next) => {
    res.render('pages/cart');
})

router.get('/woman_clothes', (req, res, next) => {
    res.render('pages/woman_clothes');
})

router.get('/men_clothes', (req, res, next) => {
    res.render('pages/men_clothes');
})

router.get('/woman_pants', (req, res, next) => {
    res.render('pages/woman_pants');
})

router.get('/men_pants', (req, res, next) => {
    res.render('pages/men_pants');
})

router.get('/register', (req, res, next) => {
    res.render('pages/register');
})

router.get('/woman_shoes', (req, res, next) => {
    res.render('pages/woman_shoes');
})

router.get('/men_shoes', (req, res, next) => {
    res.render('pages/men_shoes');
})
module.exports = router;