
'use strict';

/* Controllers */
function MenuCtrl($scope, Recipes, MultiTagUtil) {
  	$scope.recipes = Recipes.query();
  	$scope.menus = Recipes.query();
  	$scope.noOfCourses = 1;
  	$scope.foo = {name: "Umur"};
	// $scope.allTags = {tags: Recipes.getAllTagsInUse(), tags2: Recipes.getAllTagsInUse(), selected:[], selected2:[]};
	$scope.tags1 = {selected: ["tagAlpha", "tagBravo", "tagCharlie"], selectable: ["asdas", "adsa"]};
	$scope.tags2 = {selected: ["vardag"], selectable: Recipes.getAllTagsInUse()};
	var descriptionTemplate = 'partials/template-menu-intro.htm';

	$scope.setupSelections = function() {
		// $scope.newSelectionInclude();
		// $scope.newSelectionExclude();
	}

	$scope.newSelectionInclude = function() {
		$scope.includingSelections.push({numberOfRecipes:"minst 1",tags:[], id:'sel1_' + ($scope.includingSelections.length + 1)});
	}

	$scope.newSelectionExclude = function() {
		$scope.excludingSelections.push({numberOfRecipes:"något",tags:[], id:'sel1_'+ ($scope.excludingSelections.length + 1)});
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

  		alert($scope.tags1.selected + "\n" + $scope.tags2.selected);
  		var str = "";
  		var cnt = 0;
  		for (var key in $scope.tags1.selected) {
			str+=key + " ";
			if ((++cnt % 10) == 10) {
				str+="\n";
			}
  		}
  		// alert( str);

  		for (var pos in $scope.includingSelections) {
  			var tags = recipe.tags = MultiTagUtil.getTags($scope.includingSelections[pos].id);
  			alert("Including:\n" + $scope.includingSelections[pos].numberOfRecipes + " " + tags);
  			
  		}
  		
  		
  	}
  	$scope.setup();
}

