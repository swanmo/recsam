'use strict';

/* jasmine specs for controllers go here */

describe('RecipeCtrl', function(){
  var recipeCtrl, scope;

  beforeEach(module('recsamApp')) ;


  beforeEach(module(function($provide) {
    var recipeService = {
      query: function () { return [{"id":"2","name":"kalle"},{"id":"33","name":"valle"},{"id":"444","name":"tjalle"}]; }
      
    };
    $provide.value('Recipes', recipeService);
  }));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();

    recipeCtrl = $controller('RecipeCtrl', {$scope: scope});
  }));

  it('should have recipes', function() {
    expect(scope.recipes.length).toBe(3);
  });
});


describe('RecipeDevCtrl', function(){
  var recipeDevCtrl, scope, recipeMockService;

  beforeEach(module('recsamApp')) ;


  beforeEach(module(function($provide) {
    recipeMockService = {
      deletedArr:[],
      query: function () { return [{"id":"2  ","name":"kalle"},{"id":"33","name":"valle"},{"id":"444","name":"tjalle"}]; },
      delete: function(recipeId) {deletedArr.push(recipeId);}
      
    };
    $provide.value('Recipes', recipeMockService);
  }));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();

    recipeDevCtrl = $controller('RecipeDevCtrl', {$scope: scope});
  }));

  /*it('should delete all recipes', function() {
    recipeDevCtrl.clearAll();
    expect(recipeMockService.deletedArr.length).toBe(3);
  });*/
});