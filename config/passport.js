const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passport = require('passport');
const model = require('../models/model');

passport.use('local', new LocalStrategy(function(username, password, done) {
    // Match USERNAME
    model.findOne({
        username: username
    }).then(user => {
        if (!user) {
            console.log("Incorrect")
            return done(null, false)
        }
        bcrypt.compare(password, user.password, function(err, isMatch) {
            if (err) throw err
            if (isMatch) {
                return done(null, user)
            } else {
                console.log("Password Incorrect!")
                return done(null, false)
            }
        });
    })
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        model.findById(id, function(err, user) {
            done(err, user);
        })
    })
}));