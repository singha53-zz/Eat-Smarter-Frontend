
//MAIN FUNCTIONS ON PAGE
//------------------------------
//Select multiple allergies 
$(document).ready(function () {
    $('select').formSelect();
    //Tabs 
    $('.tabs').tabs();
});




//ENTER DISH
//------------------------------
// Store input value 
$("#submit").on("click", function () {
    var mealInput = $("#meal").val();
    console.log(mealInput);
});

//SELECT ALLERGY
//------------------------------
//Store selected value 
$("#submit").on("click", function () {
    searchRecipes();
})



//DISPLAY RECIPES FROM YUMMILY 
//------------------------------
//Console.log result
function searchRecipes() {
    var allergyInput = $("#allergy").val();
    var mealInput = $("#meal").val();
    var mealSearch = "&q=" + mealInput;
    var tempKey = "&_app_key=6eaaa7c45fffeea3f37d9adb28ad9960&q";
    var searchAllergy = "&allowedAllergy[]=" + allergyInput;


    $.get("http://api.yummly.com/v1/api/recipes?_app_id=30885432" + tempKey + mealSearch + searchAllergy, function (response) {
        console.log(response);
        //saving data in array 
        var matches = response["matches"];
        for (var i = 0; i < matches.length; i++) {
            var recipeResult = matches[i];
            console.log(recipeResult)


            var recipeName = recipeResult["sourceDisplayName"];
            var recipeID = recipeResult["id"];
            var recipeImage = recipeResult["smallImageUrls"];
            var recipeIngredients = recipeResult["ingredients"];

            console.log("Name:" + recipeName + " || " + "ID: " + recipeID + " || " + "Image: " + recipeImage + " || " + "Ingredients: " + recipeIngredients);



            //Appending to HTML 
            var recipeDiv = $("<div>");
            recipeDiv.addClass("card horizontal");
            recipeDiv.html(`
            <div class="card-stacked" >
            <div class="card" id=${recipeID} draggable="true" ondragstart="drag(event)">
            <div class="card-image waves-effect waves-block waves-light recipe-info">
            <img class="activator" id=${recipeID} src=${recipeImage}
            height="100%">
                 </div>
                 <span class="card-title activator grey-text text-darken-4 center">${recipeName}<i class="btn-floating btn-medium waves-effect waves-light red lighten-3 material-icons right">add</i></span>
              </div>
            </div>`);

            $("#recipeList").append(recipeDiv);

        }
    });
};






