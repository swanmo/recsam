'use strict';

/* jasmine specs for controllers go here */

describe('RecipeCtrl', function(){
  var recipeCtrl, scope;

  beforeEach(module('recsamApp')) ;

  beforeEach(module(function($provide) {
    var recipeService = {
      query: function () { return [{"id":"2","name":"kalle"},{"id":"33","name":"valle"},{"id":"444","name":"tjalle"}]; },
      getAllTags: function() {return ['test', 'kalle']}
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


describe('RecipeCreationCtrl with empty recipe query results', function(){
  var recipeCreationCtrl, scope, queryResults = [];

  beforeEach(module('recsamApp')) ;

  beforeEach(module(function($provide) {
    var recipeService = {
      query: function () { return queryResults; },
      getAllTags: function() {return ['test', 'kalle']}
    };
    $provide.value('Recipes', recipeService);
    var tagUtilService = {
      tags:['test', 'lomosv'],
      setup: function(tagitId, assignedTags, allTags, isReadonly) {}
    };
    $provide.value('TagUtil', tagUtilService);
  }));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();

    recipeCreationCtrl = $controller('RecipeCreationCtrl', {$scope: scope});
  }));

  it('should have template when theres no recipes in localStorate (i.e. Recipes.query returns empty array)', function() {
    queryResults = [];
    expect(scope.template.first).toBe('partials/template-first.htm');
  });
});


describe('RecipeCreationCtrl with non-null recipe query results', function(){
  var recipeCreationCtrl, scope, queryResults = [{'name':'kalle'},{'name':'valle'}];

  beforeEach(module('recsamApp')) ;

  beforeEach(module(function($provide) {
    var recipeService = {
      query: function () { return queryResults; },
      getAllTags: function() {return ['test', 'kalle']}
    };
    $provide.value('Recipes', recipeService);
    var tagUtilService = {
      tags:['test', 'lomosv'],
      setup: function(tagitId, assignedTags, allTags, isReadonly) {}
    };
    $provide.value('TagUtil', tagUtilService);
  }));


  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();

    recipeCreationCtrl = $controller('RecipeCreationCtrl', {$scope: scope});
  }));

  it('should have template when theres no recipes in localStorate (i.e. Recipes.query returns empty array)', function() {
    queryResults = [];
    expect(scope.template.first).toBeNull();
  });
});