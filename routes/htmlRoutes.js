/* eslint-disable */
var request = require('request');
var Meal = require('../models/meal');

module.exports = function(app, passport) {
  // Load index page

  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/signup', function(req, res) {
    res.render('signup'); //need signup.hbs
  });

  app.get('/login', function(req, res) {
    res.render('login'); // need login.hbs
  });

  app.get('/authenticated', isLoggedIn, function(req, res) {
    // res.render('secureContent');
    // res.redirect('/');
    res.send('Logged in!');
    // var goodUser = {
    //   id: req.user.id,
    //   firstname: req.user.firstname,
    //   lastname: req.user.lastname,
    //   email: req.user.email
    // };
    // res.json(goodUser);
  });

  app.post(
    '/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/',
      failureRedirect: '/signup'
    }) // change successredirect
  );

  app.post(
    '/login',
    passport.authenticate('local-signin', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
  );

  app.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
      res.redirect('/');
    });
  });

  // Render 404 page for any unmatched routes
  app.get('*', function(req, res) {
    res.render('404');
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect('/signin');
  }
};
