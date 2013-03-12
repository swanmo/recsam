
'use strict';

/* Controllers */
function MenuCtrl($scope, Recipes) {
  	$scope.recipes = Recipes.query();
  	$scope.menus = Recipes.query();
  	$scope.noOfCourses = 1;

	var descriptionTemplate = 'partials/template-menu-intro.htm';
	
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
}

