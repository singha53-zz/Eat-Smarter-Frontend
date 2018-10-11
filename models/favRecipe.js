module.exports = function(sequelize, Sequelize) {
  var favRecipe = sequelize.define("favRecipe", {
        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        recipeID: {
            type: Sequelize.STRING,
            notEmpty: true,
            unique: true
        },
        time: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        feeds: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        ingredients: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        calories: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        imageUrl: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        recipeUrl: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        nutritionEstimates: {
            type: Sequelize.TEXT,
            notEmpty: true
        }
  });

  favRecipe.associate = function(models) {
    // We're saying that a Recipe should belong to an User
    // A Recipoe can't be created without an User due to the foreign key constraint
    favRecipe.belongsTo(models.user, {
      as: "user",
      foreignKey: {
        name: "userId",
        allowNull: false
      }
    });
  };

  return favRecipe;
};