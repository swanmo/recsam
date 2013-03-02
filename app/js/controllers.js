'use strict';

/* Controllers */
function RecipeCtrl($scope, Recipes) {
console.log("loading...");
  $scope.recipes = Recipes.query();

  $scope.numberOfRecipes = $scope.recipes.length;

  $scope.numberOfHits = function() {
	return $filter("query").length;
  }
}

function RecipeDetailCtrl($scope, $routeParams, Recipes, RecipeUtils) {
  $scope.recipe = Recipes.get($routeParams.recipeId);
  RecipeUtils.ingredientsAsHtml($scope.recipe);
}

function RecipeCreationCtrl($scope, $routeParams, Recipes, localStorage) {
	$scope.master= {};

	$scope.save = function(recipe) {
		recipe.saved=false;
		recipe.ingredientsList = "";recipe.ingredients ? recipe.ingredients.split('\n') : '';
		alert("Save, ingredientsList: " + ingredientsList);
		alert("Save, stringified: " + JSON.stringify(ingredientsList));

	    $scope.master = angular.copy(recipe);

		Recipes.store($scope.master);
	  };
}

function RecipeEditCtrl($scope, $routeParams, Recipes) {
	$scope.recipe = Recipes.get($routeParams.recipeId);
}


/*
Controller for adding/removing recipes automatically, eg from e2e test.
*/
function RecipeRepopulateCtrl($scope, $routeParams, RecipesDevUtils) {
  	RecipesDevUtils.clearAll();
  	RecipesDevUtils.createTen();
}

/*
Controller for adding/removing recipes manually.
*/
function RecipeDevCtrl($scope, $routeParams, RecipesDevUtils) {
  $scope.clearAll = function() {
	RecipesDevUtils.clearAll();
    alert("Alla recept borttagna lokalt");
  },
  	$scope.createThree = function() {
		RecipesDevUtils.createThree();
		alert("Skapade 3 recept")
  	}
	$scope.createTen = function() {
	  	RecipesDevUtils.createTen();
	  	alert("Skapade 10 recept");
	}
}

function emptyRecipe() {
	return {
		id:null,
		name:'',
		servingNo:'',
		cookingMinutes:'',
		pageUrl:'',
		description:'',
		rating:'',
		ingredientsList:[],
		tags:[]
	}
}
/*function MyCtrl1() {}
MyCtrl1.$inject = [];*/
