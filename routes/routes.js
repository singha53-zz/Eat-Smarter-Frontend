module.exports = function (app) {

  // Load index page
  app.get("/", function (req, res) {
    res.render("index");
  });

   // weekly summary page
  app.get("/summary", function (req, res) {
    res.render("summary");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });

};