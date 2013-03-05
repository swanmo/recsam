'use strict';

/* Controllers */
function RecipeCtrl($scope, Recipes) {
	console.log("loading...");
  	$scope.recipes = Recipes.query();

	$scope.numberOfRecipes = $scope.recipes.length;

	$scope.numberOfHits = function() {
		return $filter("query").length;
	}
	console.log("loading complete");
}

function RecipeDetailCtrl($scope, $routeParams, Recipes, RecipeUtils) {
  $scope.recipe = Recipes.get($routeParams.recipeId);
  RecipeUtils.ingredientsAsHtml($scope.recipe);
}

function RecipeCreationCtrl($scope, $routeParams, Recipes, MessageUtil, localStorage) {
	$scope.master= {};
	$scope.messge = null;
	var firstTemplate = null;
	if (Recipes.query().length == 0) {
		firstTemplate = 'partials/template-first.htm';
	}
	$scope.template = { first: firstTemplate};

	$scope.save = function(recipe) {
		recipe.saved=false;
	    $scope.master = angular.copy(recipe);

		Recipes.store($scope.master);
		$scope.message = MessageUtil.getMessage('ok', 'Recept skapat!');
	};
}

function RecipeEditCtrl($scope, $routeParams, MessageUtil, Recipes) {
	$scope.message = null;
	$scope.recipe = Recipes.get($routeParams.recipeId);

	$scope.save = function(recipe) {
		Recipes.update(recipe);
		$scope.recipe = angular.copy(recipe);
		$scope.message = MessageUtil.getMessage('ok', 'Recept sparat!');
	};
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
