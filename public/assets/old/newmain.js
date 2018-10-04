//MAIN FUNCTIONS ON PAGE
//------------------------------
//Select multiple allergies
$(document).ready(function () {
    $("select").formSelect();
    //Tabs
    $(".tabs").tabs();
});

//ENTER DISH
//------------------------------
// Store input value
//SELECT RECIPES
//------------------------------
//Store selected value
$("#submit").on("click", function () {
    var mealInput = $("#meal").val();
    console.log(mealInput);
    $("#recipeList").html("");
    searchRecipes();
});

//DISPLAY RECIPES FROM YUMMILY
//------------------------------
//Console.log result
function searchRecipes() {
    var allergyInput = $("#allergy").val();
    var mealInput = $("#meal").val();
    var mealSearch = "&q=" + mealInput;
    var tempKey = config.MY_KEY;
    var appID = config.SECRET_KEY;
    var searchAllergy = "&allowedAllergy[]=" + allergyInput;
    var url = 'https://young-island-66909.herokuapp.com/api/getRecipes';
    // var url = "http://localhost:3000/api/getRecipes";
    // /getRecipes
    $.get(url, { q: mealInput }, function (response) {
        console.log(response);
        //saving data in array
        var matches = response["matches"];
        for (var i = 0; i < matches.length; i++) {
            var recipeResult = matches[i];
            console.log(recipeResult);

            //recipe details
            var recipeName = recipeResult["sourceDisplayName"];
            var recipeID = recipeResult["id"];
            var recipeImage = recipeResult["smallImageUrls"];
            var recipeIngredients = recipeResult["ingredients"];
            //testing results
            console.log(
                "Name:" +
                recipeName +
                " || " +
                "ID: " +
                recipeID +
                " || " +
                "Image: " +
                recipeImage +
                " || " +
                "Ingredients: " +
                recipeIngredients
            );

            //Appending to HTML
            var recipeDiv = $("<div>");
            recipeDiv.addClass("card horizontal");
            recipeDiv.html(`
            <div class="card-stacked" >
            <div class="card" id=${recipeID} draggable="true" ondragstart="drag(event)">
            <div class="card-image waves-effect waves-block waves-light recipe-info">
            <img class="activator recipeurl" id=${recipeID} src=${recipeImage}
            height="100%">
                 </div>
                 <span class="card-title activator grey-text text-darken-4 center">${recipeName}<i class="btn-floating btn-medium waves-effect waves-light red lighten-3 material-icons right">add</i></span>
              </div>
            </div>`);

            $("#recipeList").append(recipeDiv);


            //CLEAR DAY 
            //** Tip: project starter demo 4th, 16-project 2
            //-------------------
            $(".clearbtn").on("click", function () {
                var recipeDragged = $(".dropit1")
                recipeDragged.empty();
            })

            //Open Recipe 
            $(".recipeurl").on("click", function () {
                // var openURL = recipeResult.sourceRecipeUrl
                // console.log("URL:" + openURL)
            })

        }
    });
};

//#####################
//IN PROGRESS BELOW
//#####################


//SAVE THE WEEK 
//-----------------------------
//on "Save"
// $("#save-week").on("click", function () {
//     var tabs = $("#tabs-swipe-demo li");
//     //iterate through the tabs 
//     for (var i = 0; i < tabs.length; i++) {
//         console.log("-----------------------")
//         console.log("Day:" + tabs[i].id)
//         if (tabs[i].id == "monday") {

//             var nodes = $('.monday').childNodes;
//             for (var i = 0; i < nodes.length; i++) {
//                 if (nodes[i].nodeName.toLowerCase() == 'div') {
//                     nodes[i].val() = id;
//                     console.log(nodes)
//                 }
//             }

// var main = $("#dropit1");
// var mondayDiv = $(".monday").val()
// var testentireWeek = $(".monday").parents(".monday").children("#dropit1").val();
// var testingWeek = $(".monday").closest("#dropit1").find('[id*="#dropit1"]').first().attr("id")
// console.log("-----------------------")
// console.log("Entire Week:" + testentireWeek)
// console.log("testingWeek:" + testingWeek)
// console.log("Drop It Value: " + JSON.stringify(main));
// console.log("Monday Div: " + mondayDiv);
// console.log("/////////////////////////")
//         }
//     }
// });

