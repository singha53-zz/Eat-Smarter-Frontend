
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
    //Show in html
    //On click display recipe details 

    //DRAG FEATURE 
    //Allow user to drag recipe into day of week 


