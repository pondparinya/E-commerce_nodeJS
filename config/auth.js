exports.isAdmin = function(req, res, next) {
    if (req.isAuthenticated() && req.user.admin == 1) {
        next();
    } else {
        res.redirect('/login');
    }
};

exports.isUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login')
    }
}