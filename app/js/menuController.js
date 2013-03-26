
'use strict';

/* Controllers */
function MenuCtrl($scope, Recipes, MultiTagUtil) {
  	$scope.recipes = Recipes.query();
  	$scope.menus = Recipes.query();
  	$scope.noOfCourses = 4;
  	$scope.rating = 0;
	// $scope.allTags = {tags: Recipes.getAllTagsInUse(), tags2: Recipes.getAllTagsInUse(), selected:[], selected2:[]};
	$scope.selectableTags = Recipes.getAllTagsInUse();
	$scope.includingSelections = [];
	$scope.excludingSelections = [];
	var descriptionTemplate = 'partials/template-menu-intro.htm';

	$scope.setupSelections = function() {
		$scope.newSelectionInclude(["vegetariskt"]);
		$scope.newSelectionExclude();
	}

	/* <tagmanager tags="selection.tags" selectable="selection.selectable" inputid="kalle01"></tagmanager> */
	$scope.newSelectionInclude = function(arrSuggestions) {
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
	}
	
  	$scope.setup = function() {
  		$scope.setupSelections();
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
  		// $scope.noOfCourses
  		alert($scope.rating);
  		var str = "Including:\n";
  		for (var i = $scope.includingSelections.length - 1; i >= 0; i--) {
  			str += " \nincluding id: " + $scope.includingSelections[i].id + ", number:" + $scope.includingSelections[i].numberOfRecipes + ", tags: " + $scope.includingSelections[i].tags.selected + "(" +$scope.includingSelections[i].tags.selected.selected+ ")";
  		};
		str += "\nExcluding:\n";
  		for (var i = $scope.excludingSelections.length - 1; i >= 0; i--) {
  			str += " \nexcluding id: " + $scope.excludingSelections[i].id + ", number:" + $scope.excludingSelections[i].numberOfRecipes +", tags: " + $scope.excludingSelections[i].tags.selected;
  		};
  		alert(str);	
  	}
  	$scope.setup();
}

