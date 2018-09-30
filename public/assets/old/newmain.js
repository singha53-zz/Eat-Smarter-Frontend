
//MAIN FUNCTIONS ON PAGE
//------------------------------
//Select multiple allergies 
$(document).ready(function () {
    $('select').formSelect();
});



//ENTER DISH
// Store input value 
$("#submit").on("click", function () {
    var mealInput = $("#meal").val();
    console.log(mealInput);
});

//SELECT ALLERGY
//Store selected value 
$("#submit").on("click", function () {
    var allergyInput = $("#allergy").val();
    console.log(allergyInput);
})

//DISPLAY RECIPES FROM YUMMILY 
//Console.log result
var url = "http://api.yummly.com/v1/api/recipe/recipe-id?_app_id=YOUR_ID&_app_key=YOUR_APP_KEY"

function searchRecipes() {
    $.get("http://api.yummly.com/v1/api/recipes?_app_id=30885432&_app_key=6eaaa7c45fffeea3f37d9adb28ad9960&q", function (response) {
        console.log(response);
        //saving data in array 
        var matches = response["matches"];
        for (var i = 0; i < matches.length; i++) {
            var recipeResult = matches[i];
            console.log(recipeResult)
        }
    });
};
searchRecipes();


//Show in html
//On click display recipe details 





    //DRAG FEATURE 
    //Allow user to drag recipe into day of week 


