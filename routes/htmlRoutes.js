var request = require("request");
var Meal = require("../models/meal");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    request.get(
      "https://young-island-66909.herokuapp.com/api/getMealPlan",
      { json: true },
      (err, response, body) => {
        const { breakfast, lunch, dinner } = body;
        if (err) throw err;
        var meal = new Meal(breakfast, lunch, dinner);
        res.render("example", {
          msg: "Welcome!",
          example: meal
        });
      }
    );
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
