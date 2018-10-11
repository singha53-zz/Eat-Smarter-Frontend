$(document).ready(function() {

$('#fav').on('click', function(e){

  $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/favRecipes",
      data: JSON.stringify(window.recipeInfo)
    })

});

});