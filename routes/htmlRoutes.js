var Meal = require("../models/meal");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    var meal = new Meal("Cereal", "Chicken panini", "Roast beef");
    res.render("example", {
      msg: "Welcome!",
      example: meal
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
