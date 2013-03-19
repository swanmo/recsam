
'use strict';

/* Controllers */
function MenuCtrl($scope, Recipes, MultiTagUtil) {
  	$scope.recipes = Recipes.query();
  	$scope.menus = Recipes.query();
  	$scope.noOfCourses = 1;
	$scope.allTags = Recipes.getAllTagsInUse();
	var descriptionTemplate = 'partials/template-menu-intro.htm';



	$scope.$watch('allTags', function() {
		MultiTagUtil.setup('recipeTagsTemplate1', null,  $scope.allTags, false);
		MultiTagUtil.setup('recipeTagsTemplate2', null, $scope.allTags, false);
		MultiTagUtil.setup('recipeTagsTemplate3', null, $scope.allTags, false);
	});
	
  	$scope.setup = function() {
		$( ".selector" ).slider({ min: 10 });
		var me = this;
		$( "#sliderCourses" ).slider({
			min:1,
			max:10,
		  	change: function( event, ui ) {
		  		me.noOfCourses = ui.value;
		  		me.$digest();
		  	}
		});
  	}
  	$scope.setup();

  	$scope.createMenu = function() {
  		alert("create");
  	}
}

