var authController = require('../controllers/authcontroller.js');

module.exports = function (app, passport) {

    app.get('/', authController.signup);
    app.get('/', authController.signin);

    app.post('/', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',

        failureRedirect: '/signup'
    }));
    app.get('/dashboard', isLoggedIn, authController.dashboard);
    app.get('/logout', authController.logout);

    app.post('/', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',

        failureRedirect: '/index'
    }
    ));

    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated())

            return next();

        res.redirect('/signin');

    }
}