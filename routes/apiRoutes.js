var db = require("../models");
var axios = require('axios');

module.exports = function(app) {

// search a given recipe keyword
app.get("/search/:meal/:allergy", function(req, res) {

  var url = `https://api.yummly.com/v1/api/recipes?_app_id=6fe80130&_app_key=e47479bfbd3e29b4ddd5ceb95d60916f&q=${req.params.meal.replace(
      ' ',
      '+'
    )}&requirePictures=true${req.params.allergy.split(',')
      .map(allergy => {
        return '&allowedAllergy[]=' + allergy;
      })
      .join('')}&maxResult=15`;
    console.log(url);

  axios.get(url)
  .then(function(response) {
   console.log(response.data.matches)

    res.json(response.data)
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
    console.log(result)
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


};
