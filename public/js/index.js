// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  createUser: function(user) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/createUser",
      data: JSON.stringify(user)
    });
  },
  saveDailyMealPlan: function(dailyMealPlan) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/saveDailyMealPlan",
      data: JSON.stringify(dailyMealPlan)
    });
  },
  associateAllergy: function(allergy) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/associateAllergy",
      data: JSON.stringify(allergy)
    });
  },
  favouriteAdd: function(favourite) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/favourite/add",
      data: JSON.stringify(favourite)
    });
  },
  getRecipes: function() {
    return $.ajax({
      url: "api/getRecipes",
      type: "GET"
    });
  },
  getRecipesById: function(recipeId) {
    return $.ajax({
      url: "api/getRecipes:" + recipeId,
      type: "GET"
    });
  },
  deleteFavourite: function() {
    return $.ajax({
      url: "api/favourite/destroy",
      type: "DELETE"
    });
  },
  deleteUser: function() {
    return $.ajax({
      url: "api/user/destroy",
      type: "DELETE"
    });
  },
  getUser: function() {
    return $.ajax({
      url: "api/getUser",
      type: "GET"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

// Button to open Recipe Page in new Tab

var $recipeButton = $("#recipeButton");

var handleRecipeButton = function() {
  var recipeUrl = $(this).attr("recipeUrl");

  API.getRecipesById(recipeId).then(function() {
    recipeUrl = recipeUrl.attr().attribution.html;
  });
};

$recipeButton.on("click", handleRecipeButton);

{
  /* <input
  type="button"
  value="recipeButton"
  onclick="window.open('http://www.website.com/page')"
/>; */
}

module.exports = API;