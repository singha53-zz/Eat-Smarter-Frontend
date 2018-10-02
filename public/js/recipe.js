// Get references to page elements
var recipeName = $("#recipeName");
var recipeImage = $("#recipeImage");
var prepTime = $("#prepTime");
var servings = $("#servings");

// The API object contains methods for each kind of request we'll make
var API = {
  getRecipe: function(recipe) {
    return $.ajax({
      url: "api/recipe",
      type: "POST",
      data: JSON.stringify(recipe)
    });
  }
};


// Functionality for Recipe Page to Populate to be added here
