var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongodb = require('mongod');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
require('./config/passport')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// setup Public
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    }))
    // Setup Passport
app.use(passport.initialize());
app.use(passport.session());

// Use URL & Router 
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Connect database 

const url = "mongodb+srv://ecommerce:ecommerce@cluster0.idq5h.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(function() {

        console.log("Connecting to Mongodb Success!")
    })
    .catch(function(err) {
        console.log(err)
        console.log("Fail to connect database")
    })









// All error 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;