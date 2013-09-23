
'use strict';

/* Controllers */
function MenuCtrl($scope, Recipes, MultiTagUtil) {
  	$scope.recipes = Recipes.query();
  	$scope.menus = Recipes.query();
  	$scope.noOfMeals = "4";
  	$scope.rating = 0;
	$scope.tagsInAllRecipes = [];
	$scope.tagsInNoRecipes = [];
	$scope.selectableTags = Recipes.getAllTagsInUse();
	$scope.selectionsPerRecipe = [];
	$scope.showAdvancedOptions = false;

	var descriptionTemplate = 'partials/template-menu-intro.htm';

	$scope.setupSelections = function() {
		
	}

	$scope.changeNumberOfMeals = function() {
		console.log("changeNumberOfMeals: " + $scope.noOfMeals);
		$scope.updateSelectionsPerRecipe();
	}

	$scope.advancedOptions = function() {
		$scope.showAdvancedOptions = true;
	}

	$scope.hideAdvancedOptions = function() {
		$scope.showAdvancedOptions = false;
	}

	$scope.updateSelectionsPerRecipe = function(arrSuggestions) {
		var noMeals = parseInt($scope.noOfMeals);
		while ($scope.selectionsPerRecipe.length < noMeals) {
			$scope.selectionsPerRecipe.push(
					{no:($scope.selectionsPerRecipe.length + 1),
					tags:{selected:arrSuggestions},
					id:'sel1_' + ($scope.selectionsPerRecipe.length + 1),
					selectable: $scope.selectableTags}
				);
		};

		while ($scope.selectionsPerRecipe.length > noMeals) {
			$scope.selectionsPerRecipe.pop();
		};
	}

	/* <tagmanager tags="selection.tags" selectable="selection.selectable" inputid="kalle01"></tagmanager> */
	/*$scope.newSelectionInclude = function(arrSuggestions) {
		$scope.includingSelections.push(
			{numberOfRecipes:"minst 1",
			tags:{selected:arrSuggestions},
			id:'sel1_' + ($scope.includingSelections.length + 1),
			selectable: $scope.selectableTags});
	}

	$scope.newSelectionExclude = function() {
		$scope.excludingSelections.push({
			numberOfRecipes:"något",
			tags:{selected:[]},
			id:'sel2_'+ ($scope.excludingSelections.length + 1),
			selectable: $scope.selectableTags});
	}*/
	
  	$scope.setup = function() {
  		$scope.setupSelections();
  		$scope.updateSelectionsPerRecipe();
		/*$( ".selector" ).slider({ min: 10 });
		var me = this;
		$( "#sliderCourses" ).slider({
			min:1,
			max:10,
		  	change: function( event, ui ) {
		  		me.noOfCourses = ui.value;
		  		me.$digest();
		  	}
		});*/
  	}
  	$scope.afterRendered = function() {
  		alert("rendered");
  	}

  	$scope.createMenu = function() {
  		alert("rating: " + $scope.rating + "\ntags in all recipes: " + tagsInAllRecipes);

  	}
  	$scope.setup();
}

