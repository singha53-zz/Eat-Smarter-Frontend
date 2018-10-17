var db = require("../models");
var axios = require('axios');
var authController = require('../controllers/authcontroller.js');

module.exports = function (app) {

  // Load index page
  app.get("/", function (req, res) {
    res.render("index");
  });

   // weekly summary page
  app.get("/summary", function (req, res) {
    res.render("summary");
  });

  app.get('/signup', authController.signup);
  app.get('/signin', authController.signin);
  
  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect: '/dashboard',

      failureRedirect: '/signup'
  }));
  app.get('/dashboard', isLoggedIn,authController.dashboard);
  app.get('/logout',authController.logout);

  app.post('/signin', passport.authenticate('local-signin', {
      successRedirect: '/dashboard',

      failureRedirect: '/signin'
  }
  ));

  // search a given recipe keyword
app.get("/search/:meal/:allergy", function(req, res) {

  if(req.params.meal === "nil"){
    req.params.meal = ''
  }
  if(req.params.allergy === "nil"){
    req.params.allergy = ''
  }
  
  // app_id=6fe80130
  // app_key=e47479bfbd3e29b4ddd5ceb95d60916f
  
    var url = `https://api.yummly.com/v1/api/recipes?_app_id=6fe80130&_app_key=e47479bfbd3e29b4ddd5ceb95d60916f&q=${req.params.meal.replace(
        ' ',
        '+'
      )}&requirePictures=true${req.params.allergy.split(',')
        .map(allergy => {
          return '&allowedAllergy[]=' + allergy;
        })
        .join('')}&maxResult=15`;
  
    axios.get(url)
    .then(function(response) {
      res.json(response.data)
    }).catch(err => {
      console.log(err)
    })
    });
  
  //  search for a given recipe
  app.get("/search/:recipe", function(req, res) {
      console.log(req.params)
      var url = 'https://api.yummly.com/v1/api/recipe/' +
        req.params.recipe +
        '?_app_id=6fe80130&_app_key=e47479bfbd3e29b4ddd5ceb95d60916f';
  
        axios.get(url)
    .then(function(response) {
      
      res.json(response.data)
    }).catch(err =>{
      console.log(err)
    })
  })
  
    // Get all favourite recipes
    app.get("/api/favRecipes", function(req, res) {
      db.favRecipe.findAll({
        where: {
          userId: req.user.id
        }
      }).then(function(result) {
        res.json(result);
      });
    });
  
    // Create a new favourite recipe
    app.post("/api/favRecipes", function(req, res) {
      console.log('server:' + JSON.stringify(req.body))
      console.log('req.user:'+ JSON.stringify(req.user))
  
      var recipe = req.body;
      recipe.userId = req.user.id
      console.log(recipe)
      // recipe.userId = req.user.id
    db.favRecipe.create(recipe).then(function(result) {
      console.log(result)
        res.json(result)
      }).catch(err =>{
        console.log(err)
      })
      // res.redirect('/dashboard')
    });
    
    // Create a new recipe
    app.post("/api/recipes", function(req, res) {
      var recipe = req.body;
      recipe.userId = req.user.id
    db.addRecipe.create(recipe).then(function(result) {
        res.json(result)
      }).catch(err =>{
        console.log(err)
      })
    });
  
  //get all added recipes
    app.get("/api/recipes", function(req, res) {
      db.addRecipe.findAll({
        where: {
          userId: req.user.id
        }
      }).then(function(result) {
        res.json(result);
      });
    });
  
  
    // get search
    app.get("/fav", function(req, res) {
      db.favRecipe.findAll({}).then(function(result) {
        res.json(result.map(d => d.name));
      });
    });
  
      // get an example by id
    app.get("/api/recipe/:id", function(req, res) {
      console.log(req.body.dataValues)
      db.addRecipe.findOne({ where: { recipeID: req.params.id } }).then(function(recipe) {
        res.json(recipe);
      });
    });
  
    // Delete an example by id
    app.delete("/api/recipe/:id", function(req, res) {
      console.log(req.body.dataValues)
      db.addRecipe.destroy({ where: { recipeID: req.params.id } }).then(function(recipes) {
        res.json(recipes);
      });
    });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });

};