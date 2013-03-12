'use strict';


// Declare app level module which depends on filters, and services
var recsamApp = angular.module('recsamApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/new-recipe', {
		templateUrl: 'partials/new-recipe.htm',
		controller: RecipeCreationCtrl});
	$routeProvider.when('/edit-recipe/:recipeId', {
		templateUrl: 'partials/new-recipe.htm',
		controller: RecipeEditCtrl});
	$routeProvider.when('/recipes', {
		templateUrl: 'partials/recipes.htm',
		controller: RecipeCtrl});
	$routeProvider.when('/recipes/:recipeId/:alias', {
		templateUrl: 'partials/recipe-details.htm',
		controller: RecipeDetailCtrl});
	$routeProvider.when('/dev12', {
		templateUrl: 'partials/development.htm',
		controller: RecipeDevCtrl});
	$routeProvider.when('/dev12repopulate', {
		templateUrl: 'partials/development.htm',
		controller: RecipeRepopulateCtrl});


    $routeProvider.when('/menu', {
    	templateUrl: 'partials/menu.htm',
    	controller: MenuCtrl});
    $routeProvider.when('/shopping-cart', {
    	templateUrl: 'partials/construction.htm',
    	controller: RecipeCtrl});
    $routeProvider.otherwise({
    	redirectTo: '/recipes'});
  }]);

recsamApp.value('localStorage', window.localStorage);