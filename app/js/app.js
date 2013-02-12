'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/new-recipe', {templateUrl: 'partials/new-recipe.htm', controller: RecipeCtrl});
	$routeProvider.when('/all-recipes', {templateUrl: 'partials/recipes.htm', controller: RecipeCtrl});


    $routeProvider.when('/menu', {templateUrl: 'partials/construction.htm', controller: MyCtrl1});
    $routeProvider.when('/shopping-cart', {templateUrl: 'partials/construction.htm', controller: MyCtrl2});
    $routeProvider.otherwise({redirectTo: '/all-recipes'});
  }]);
