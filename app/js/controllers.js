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

function RecipeDetailCtrl($scope, $routeParams, Recipes, RecipeUtils, TagUtil) {
  $scope.recipe = Recipes.get($routeParams.recipeId);

  RecipeUtils.ingredientsAsHtml($scope.recipe);

  $scope.$watch('recipe', function() {
		TagUtil.setup('recipeTags',$scope.recipe.tags, null, true);
	});
}

function RecipeCreationCtrl($scope, $routeParams, Recipes, MessageUtil, TagUtil) {
	$scope.master= {};
	$scope.message = null;
	var firstTemplate = null;

	$scope.allTags = Recipes.getAllTags();

	if (Recipes.query().length == 0) {
		firstTemplate = 'partials/template-first.htm';
	}
	$scope.template = { first: firstTemplate};

	$scope.$watch('allTags', function() {
		if ($scope.allTags.length) {
			TagUtil.setup('recipeTags',null, $scope.allTags, false);
		}
	});

	$scope.save = function(recipe) {
		recipe.saved=false;
		recipe.tags = TagUtil.tags;
	    $scope.master = angular.copy(recipe);

		Recipes.store($scope.master);
		$scope.message = MessageUtil.getMessage('ok', 'Recept skapat!');
	};
}

function RecipeEditCtrl($scope, $routeParams, MessageUtil, Recipes, TagUtil) {
	$scope.message = null;
	$scope.recipe = Recipes.get($routeParams.recipeId);
	$scope.allTags = Recipes.getAllTags();

	$scope.noOfThingsLoaded = 0;

	$scope.$watch('allTags', function() {
		if ($scope.allTags.length) {
			$scope.noOfThingsLoaded++;
			$scope.afterFetched();
		}
	});

   	$scope.$watch('recipe', function() {
    	if ($scope.recipe.id) {
			$scope.noOfThingsLoaded++;
			$scope.afterFetched();
		}
   	});

   	$scope.afterFetched = function() {
   		if ($scope.noOfThingsLoaded == 2) {
   			TagUtil.setup('recipeTags',$scope.recipe.tags, $scope.allTags, false);
	  	}
   	}

	$scope.save = function(recipe) {
		recipe.tags = TagUtil.tags;
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
