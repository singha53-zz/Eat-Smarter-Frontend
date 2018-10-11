$(document).ready(function() {
// nutriential requirements
var energy = 0;
onDocumentReady(energy);


var counter = 0;

  // Materlize functionality
  $('.sidenav').sidenav();
  $('select').formSelect();
  $('.dropdown-trigger').dropdown();
  $('.tabs').tabs();

// The API object contains methods for each kind of request we'll make
var API = {
  postRecipe: function(recipe) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/recipes",
      data: JSON.stringify(recipe)
    });
  },
  getRecipe: function(url) {
    return $.ajax({
      url: url,
      type: "GET"
    });
  },
  deleteRecipe: function(id) {
    return $.ajax({
      url: "api/recipe/" + id,
      type: "DELETE"
    });
  }
};


// delete chip on click
  $(document).on('click', '.close', function(event) {
    counter = 0;
    console.log($(this).parent().remove())
   console.log($(this).parent()[0].id)
   API.deleteRecipe($(this).parent()[0].id)
      //  window.location.reload()
   window.getRecipes()

  })


  $('#sunday-breakfast').chips({placeholder: 'Breakfast',secondaryPlaceholder: '+Tag'});
  $('#sunday-lunch').chips({placeholder: 'Lunch',secondaryPlaceholder: '+Tag'});
  $('#sunday-dinner').chips({placeholder: 'Dinner',secondaryPlaceholder: '+Tag'});
  $('#sunday-snacks').chips({placeholder: 'Snacks',secondaryPlaceholder: '+Tag'});
  $('#monday-breakfast').chips({placeholder: 'Breakfast',secondaryPlaceholder: '+Tag'});
  $('#monday-lunch').chips({placeholder: 'Lunch',secondaryPlaceholder: '+Tag'});
  $('#monday-dinner').chips({placeholder: 'Dinner',secondaryPlaceholder: '+Tag'});
  $('#monday-snacks').chips({placeholder: 'Snacks',secondaryPlaceholder: '+Tag'});
  $('#tuesday-breakfast').chips({placeholder: 'Breakfast',secondaryPlaceholder: '+Tag'});
  $('#tuesday-lunch').chips({placeholder: 'Lunch',secondaryPlaceholder: '+Tag'});
  $('#tuesday-dinner').chips({placeholder: 'Dinner',secondaryPlaceholder: '+Tag'});
  $('#tuesday-snacks').chips({placeholder: 'Snacks',secondaryPlaceholder: '+Tag'});
  $('#wednesday-breakfast').chips({placeholder: 'Breakfast',secondaryPlaceholder: '+Tag'});
  $('#wednesday-lunch').chips({placeholder: 'Lunch',secondaryPlaceholder: '+Tag'});
  $('#wednesday-dinner').chips({placeholder: 'Dinner',secondaryPlaceholder: '+Tag'});
  $('#wednesday-snacks').chips({placeholder: 'Snacks',secondaryPlaceholder: '+Tag'});
  $('#thursday-breakfast').chips({placeholder: 'Breakfast',secondaryPlaceholder: '+Tag'});
  $('#thursday-lunch').chips({placeholder: 'Lunch',secondaryPlaceholder: '+Tag'});
  $('#thursday-dinner').chips({placeholder: 'Dinner',secondaryPlaceholder: '+Tag'});
  $('#thursday-snacks').chips({placeholder: 'Snacks',secondaryPlaceholder: '+Tag'});
  $('#friday-breakfast').chips({placeholder: 'Breakfast',secondaryPlaceholder: '+Tag'});
  $('#friday-lunch').chips({placeholder: 'Lunch',secondaryPlaceholder: '+Tag'});
  $('#friday-dinner').chips({placeholder: 'Dinner',secondaryPlaceholder: '+Tag'});
  $('#friday-snacks').chips({placeholder: 'Snacks',secondaryPlaceholder: '+Tag'});
  $('#saturday-breakfast').chips({placeholder: 'Breakfast',secondaryPlaceholder: '+Tag'});
  $('#saturday-lunch').chips({placeholder: 'Lunch',secondaryPlaceholder: '+Tag'});
  $('#saturday-dinner').chips({placeholder: 'Dinner',secondaryPlaceholder: '+Tag'});
  $('#saturday-snacks').chips({placeholder: 'Snacks',secondaryPlaceholder: '+Tag'});

// Get references to page elements
var $meal = $("#meal");
var $allergies = $("#allergy");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// functions to use
function addImages(course, recipe) {
    // image = $('<img>')
    // image.attr('src', recipe.smallImageUrls);
    // image.attr('id', recipe.id);

    var recipeDiv = $('<div>');
    recipeDiv.addClass('card horizontal');
    recipeDiv.html(`
      <div class="card-stacked">
        <div class="card-content">
            <img id=${recipe.id} src=${recipe.smallImageUrls}>
            <br>
            <a id=${recipe.id} class="recipe">${recipe.id
      .split('-')
      .slice(0, -1)
      .join(' ')}</a>
        </div>
      </div>`);

    $('#recipeList').append(recipeDiv);
  }

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
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

var handleFormSubmit = function(event) {
  event.preventDefault();

  var recipe = {
    meal: $meal.val(),
    allergy: $allergies.val()
  };
  console.log(recipe)

var url = `/search/${recipe.meal}/${recipe.allergy}`
console.log(url)

  API.getRecipe(url).then(res => {
    $('#recipeList').empty();
        console.log(res);
        for (var i = 1; i < res.matches.length; i++) {
          var image;
          if (res.matches[i].attributes.course !== undefined) {
            // console.log(res.matches[i].attributes.course);
            addImages(res.matches[i].attributes.course[0], res.matches[i]);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });

  $meal.val("");
};

// clicking on a recipe
$(document).on('click', '.recipe', function(event) {
counter = 0;

  console.log( window.location)
  console.log(event.currentTarget.id)
var recipe = event.currentTarget.id;
console.log(recipe)
  var url = `/search/${recipe}/`

API.getRecipe(url).then(res => {
console.log(res)
console.log(res.nutritionEstimates.length < 1)
var recipeObj = {name: res.name,
  recipeID: res.id,
  time:res.totalTime,
  feeds:res.numberOfServings,
  ingredients:res.ingredientLines.length,
  imageUrl:res.images[0].hostedMediumUrl,
  recipeUrl:res.source.sourceRecipeUrl
  }
if(res.nutritionEstimates.length < 1){
recipeObj.calories = "NA"
recipeObj.nutritionEstimates = null
recipeObj.nutritionEstimatesAvail = `<div id="recipeServes" class="col s12">Nutritional information <span style="color:red;"> not </span> available</div>`
} else {
  // console.log(res.nutritionEstimates[72].value)
recipeObj.calories = res.nutritionEstimates.filter(d => {
  return d.attribute === "ENERC_KCAL"
})[0].value
recipeObj.nutritionEstimates = JSON.stringify(res.nutritionEstimates)
recipeObj.nutritionEstimatesAvail = `<div id="recipeServes" class="col s12">Nutritional information available</div>`

}

console.log(recipeObj)
// $('#recipeName').innerHTML = res.name;
document.getElementById("recipeName").innerHTML = recipeObj.name

$('#selectRecipe').empty();
 $('#selectRecipe').append(`<div class="row">
          <div id=${res.id} class="col s6">
          <img "materialboxed" src = ${recipeObj.imageUrl}>
          </div>
          <div class="col s6">
          <div class="row">
<div id="recipeTime" class="col s12">Time: ${recipeObj.time}</div>
<div id="recipeFeeds" class="col s12">Feeds: ${recipeObj.feeds}</div>
<div id="recipeIngredients" class="col s12">Ingredients: ${recipeObj.ingredients}</div>
<div id="recipeServes" class="col s12">Calories: ${recipeObj.calories}</div>
          </div>
          </div>
          ${recipeObj.nutritionEstimatesAvail}
        </div>
              `)

// add recipe link  to upload button
$("#getRecipe").attr("href",  recipeObj.recipeUrl)

//  save data to window
 window.recipeInfo = recipeObj

  }).catch(err => {
    console.log(err)
  })
})

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

// var nutrientData=[
//     {State:'FAT_KCAL',freq:{}}
//     ,{State:'FASAT',freq:{}}
//     ,{State:'FOLDFE',freq:{}}
//     // ,{State:'ENERC_KJ',freq:{}}
//     ,{State:'WATER',freq:{}}
//     ,{State:'FAMS',freq:{}}
//     ,{State:'FIBTG',freq:{}}
//     ,{State:'PROCNT',freq:{}}
//     ,{State:'CHOCDF',freq:{}}
//     ,{State:'CHOLE',freq:{}}
//     ,{State:'FAPU',freq:{}}
//     // ,{State:'VITA_IU',freq:{}}
//     // ,{State:'ENERC_KCAL',freq:{}}
//     ];
var nutrientData = window.nutrientData;
console.log(nutrientData)

 $("#tabs-swipe-demo li").click(function (e) {
   console.log(e)
// nutrientData=[
//     {State:'FAT_KCAL',freq:{}}
//     ,{State:'FASAT',freq:{}}
//     ,{State:'FOLDFE',freq:{}}
//     // ,{State:'ENERC_KJ',freq:{}}
//     ,{State:'WATER',freq:{}}
//     ,{State:'FAMS',freq:{}}
//     ,{State:'FIBTG',freq:{}}
//     ,{State:'PROCNT',freq:{}}
//     ,{State:'CHOCDF',freq:{}}
//     ,{State:'CHOLE',freq:{}}
//     ,{State:'FAPU',freq:{}}
//     // ,{State:'VITA_IU',freq:{}}
//     // ,{State:'ENERC_KCAL',freq:{}}
//     ];
    console.log(nutrientData)
 })

// add recipe to database
$(document).on('click', '.add', function(event) {
  if(counter === 0){
  var addRecipe = window.recipeInfo;
console.log(addRecipe)
  // add chips to calendar
  var ref_this = $("ul.tabs li a.active");
  console.log(`${ref_this[0].id}-${event.target.id}`)
  addRecipe.calendar = `${ref_this[0].id}-${event.target.id}`;


// ## extract recipe id
// var recipeID = $('#selectRecipe div:first').children().attr('id');
// console.log(recipeID)
//   var url = `/search/${recipeID}/`

  $('#'+ref_this[0].id+'-'+event.target.id).append(`  <div class="chip" id=${addRecipe.recipeID}>
    ${addRecipe.name}
    <i class="close material-icons">close</i>
  </div>`)

//  make piechart
console.log(addRecipe.nutritionEstimates)
if(addRecipe.nutritionEstimates !== null){
var nutrientData = window.nutrientData;
var nutritionEstimates = JSON.parse(addRecipe.nutritionEstimates)
console.log(nutrientData);
console.log(nutritionEstimates)
  for (let i = 0; i < nutrientData.length; i++) {
  nutrientData[i].freq[addRecipe.recipeID] =  nutritionEstimates.filter(d => {
    console.log(d.attribute === nutrientData[i].State)
  return d.attribute === nutrientData[i].State
  })[0].value
  }
  addRecipe.nutrientData = JSON.stringify(nutrientData);
  $('#piechart').empty();
  dashboard('#piechart', nutrientData); 
}

console.log(addRecipe)
// post recipe to database
  $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/recipes",
      data: JSON.stringify(addRecipe)
    })

//   API.getRecipe(url).then(res => {
//     console.log(res.nutritionEstimates.length)
//     console.log(res.nutritionEstimates)

// if(res.nutritionEstimates.length >1){
// var nutrientData = window.nutrientData;
//   for (let i = 0; i < nutrientData.length; i++) {
//   nutrientData[i].freq[recipeID] =  res.nutritionEstimates.filter(d => {
//   return d.attribute === nutrientData[i].State
//   })[0].value
//   }
//   addRecipe.nutrientData = JSON.stringify(nutrientData);
//   $('#piechart').empty();
//   dashboard('#piechart', nutrientData);
// } else {
//   addRecipe.nutrientData = null
// }
//   })
  }
// update energy content
// $("#power-gauge").empty();
// // console.log(nutrientData[0].freq)
// if(nutrientData[0].freq !== undefined){
//   console.log(nutrientData[0].freq)
//   energy += 500
// } else {
//   energy = 0
// }
// console.log(energy)
// onDocumentReady(energy);


  counter++

})

$(document).on('click', '#getRecipe', function(event) {
$("#getRecipe").attr("href",  window.recipeInfo.recipeUrl)
})



// var freqData=[
// {State:'AL',freq:{low:4786, mid:1319, high:249}}
// ,{State:'AZ',freq:{low:1101, mid:412, high:674}}
// ,{State:'CT',freq:{low:932, mid:2149, high:418}}
// ,{State:'DE',freq:{low:832, mid:1152, high:1862}}
// ,{State:'FL',freq:{low:4481, mid:3304, high:948}}
// ,{State:'GA',freq:{low:1619, mid:167, high:1063}}
// ,{State:'IA',freq:{low:1819, mid:247, high:1203}}
// ,{State:'IL',freq:{low:4498, mid:3852, high:942}}
// ,{State:'IN',freq:{low:797, mid:1849, high:1534}}
// ,{State:'KS',freq:{low:162, mid:379, high:471}}
// ];

// dashboard('#piechart', freqData);
})
