/* eslint-disable */
var request = require('request');
var Meal = require('../models/meal');

module.exports = function(app, passport) {
  // Load index page

  app.get('/', function(req, res) {
    res.render('index');
  });

  // Render 404 page for any unmatched routes
  app.get('*', function(req, res) {
    res.render('404');
  });
};
