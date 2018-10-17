var exports = module.exports = {}
 
exports.signup = function(req, res) {
 
    res.render('signup');
 
}

exports.signin = function(req, res) {
 
    res.render('signin');
 
}

exports.dashboard = function(req, res) {
 
    res.render('dashboard');
 
}

exports.getFaves = function(req, res) {
 
   
 
}

exports.newFave = function(req, res) {
    
    console.log('server:' + JSON.stringify(req.body))
    console.log('req.user:'+ JSON.stringify(req.user))

    var recipe = req.body;
    recipe.userId = req.user.id
    console.log(recipe)
    
  db.favRecipe.create(recipe).then(function(result) {
    console.log(result)
      res.json(result)
    }).catch(err =>{
      console.log(err)
    })
   
}

exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}