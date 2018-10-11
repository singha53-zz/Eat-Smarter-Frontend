$(document).ready(function() {
  // add initialize recipe to dashboard
  setRecipe();

    // add recipes to calendar
  getRecipes();

  function setRecipe(){
   $.get("/api/recipe/Awesome-Pepperoni-Pizza-1873784", function(data) {
     if(data === null){
       window.recipeInfo = {name: "Awesome Pepperoni Pizza",
  recipeID: "Awesome-Pepperoni-Pizza-1873784",
  time:"45 min",
  feeds:4,
  ingredients:8,
  imageUrl:"https://lh3.googleusercontent.com/UfzLfk9ugfdHhepQcvY30yBVA-070xMFYM-e72JZXdN2e2bP827PHte_9FatjPYqQl8-GO2wSFu0GkFtchoqocM=s180",
  recipeUrl:"http://www.bigoven.com/recipe/awesome-pepperoni-pizza/165695",
  calories:  655.87,
  nutritionEstimates: JSON.stringify([{"attribute":"ENERC_KCAL","value":280},{"attribute":"PROCNT","value":30},{"attribute":"SUGAR","value":0.85},{"attribute":"WATER","value":127.6},{"attribute":"CHOCDF","value":61.69}]),
  nutritionEstimatesAvail:`<div id="recipeServes" class="col s12">Nutritional information available</div>`
       }
     } else {
       window.recipeInfo =  data
     }
  console.log(window.recipeInfo)
  })
  }

  function getRecipes(){
    $.get("/api/recipes", function(data) {
      console.log(data)
      console.log(data.length)

      if(data.length !== 0){
      data.forEach(d =>{
        $(`#${d.calendar}`).empty();
        $(`#${d.calendar}`).append(`  <div class="chip" id="${d.recipeID}">
    ${d.name}
    <i class="close material-icons">close</i>
  </div>`)
      });
console.log(data)

// update piechart
var nutrientData=[
    {State:'ENERC_KCAL',freq:{}}
    ,{State:'PROCNT',freq:{}}
    ,{State:'SUGAR',freq:{}}
    ,{State:'WATER',freq:{}}
    ,{State:'CHOCDF',freq:{}}
    ];
console.log(data)
data.forEach(d => {
  console.log(d)
  d.nutritionEstimates = JSON.parse(d.nutrientData)
 if(d.nutritionEstimates !== null){
  for (let i = 0; i < nutrientData.length; i++) {
  nutrientData[i].freq[d.recipeID] =  d.nutritionEstimates[i].freq[d.recipeID]/d.feeds
  }
  }
});
console.log(nutrientData)
window.nutrientData = nutrientData;
  $('#piechart').empty();
  dashboard('#piechart', nutrientData);

// update gauges
$("#power-gauge").empty();
var energy = 0;
for(var prop in nutrientData[2].freq){
  energy += nutrientData[2].freq[prop]
}
console.log(energy)
if(energy > 40){
  alert('Are you serious? Lower your sugar intake!! You broke the scale!')
}
onDocumentReady(energy);

      } else{
        $('#piechart').empty();
        var nutrientData=[
    {State:'ENERC_KCAL',freq:{}}
    ,{State:'PROCNT',freq:{}}
    ,{State:'SUGAR',freq:{}}
    ,{State:'WATER',freq:{}}
    ,{State:'CHOCDF',freq:{}}
    ];
    window.nutrientData = nutrientData;

    $("#power-gauge").empty();
    energy=0
    onDocumentReady(energy);
      }

    });
  }

  window.getRecipes = getRecipes;

});