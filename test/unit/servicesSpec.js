'use strict';

/* jasmine specs for services go here */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
Recipe
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
describe('Recipe service', function() {
  var localStorage, $rootScope, recipeService;
  beforeEach(module('recsamApp'));

	beforeEach(function() {
	  localStorage = {
      recsam: '[{"id":"rec_20120222_1735_123", "name":"Pangkaka"}, {"id":"rec_20120222_0202_101", "name":"Estrella-burgare"}]'
  	};
	 
	  module(function($provide) {
	  	$provide.value('$rootScope', {});
	    $provide.value('localStorage', localStorage);
	  });
	 
	  inject(function($injector) {
	    recipeService = $injector.get('Recipes');
	  });

	});

    it('query should return all (2) recipes', function() {
      expect(recipeService.query().length).toBe(2);
    });

    it('allRecipes should return all (2) recipes', function() {
      expect(recipeService.allRecipes().length).toBe(2);
    });

    it('get should return one recipe with id: rec_20120222_1735_123 (name = Pangkaka)', function() {
      expect(recipeService.get('rec_20120222_1735_123')).not.toBeNull();
      expect(recipeService.get('rec_20120222_1735_123').name).toBe('Pangkaka');
    });

    it('get should return null, since there is no recipe with id: rec_20110101_1735_123', function() {
      expect(recipeService.get('rec_20110101_1735_123')).toBeNull();
    });

    it('setAllRecipes should overwrite localStorage', function() {
      var jObject = [{"id":"rec_20110101_1735_100", "name":"Test"}];
      recipeService.setAllRecipes(jObject);

      expect(eval(localStorage['recsam']).length).toBe(1);
      expect(recipeService.allRecipes().length).toBe(1);
    });

    it('delete should remove recipe with id: rec_20120222_1735_123', function() {
      expect(recipeService.allRecipes().length).toBe(2);
      recipeService.delete('rec_20120222_1735_123');
      expect(recipeService.allRecipes().length).toBe(1);
    });

    it('createId should return a string with format: rec_20120222_1735_123', function() {
      expect(recipeService.createId(new Date()).length > 16).toBe(true);
    });

    it('store should add another recipe to localStorage', function() {
      expect(recipeService.allRecipes().length).toBe(2);
      var jsonString = {"id":"rec_20120222_1735_123", "name":"Pangkaka"};
      
      recipeService.store(jsonString);
      expect(recipeService.allRecipes().length).toBe(3);
    });

});



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
RecipeUtils
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
describe('RecipeUtils service', function() {
  var $rootScope, recipeUtilsService;
  beforeEach(module('recsamApp'));

  beforeEach(function() {
      module(function($provide) {
        $provide.value('$scope', {sleep:function() {} });
      });
     
      inject(function($injector) {
        recipeUtilsService = $injector.get('RecipeUtils');
      });

    });

    it('createThree should call Recipe.store three times', function() {
      expect(recipeUtilsService.ingredientsAsHtml(
          {ingredients:'line 1\nline 2\nline 3'}
          ).ingredients).
        toEqual('line 1<br>line 2<br>line 3');
    });

});





/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
RecipesDevUtils
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
describe('RecipesDevUtils service', function() {
  var $rootScope, recipeServiceMock, RecipesDevUtilsService;
  beforeEach(module('recsamApp'));

  beforeEach(function() {
      recipeServiceMock = {
          query:jasmine.createSpy(),
          delete:jasmine.createSpy(),
          get:jasmine.createSpy(),
          store:jasmine.createSpy()
      };
     
      module(function($provide) {
        $provide.value('$scope', {sleep:function() {} });
        $provide.value('Recipes', recipeServiceMock);
      });
     
      inject(function($injector) {
        RecipesDevUtilsService = $injector.get('RecipesDevUtils');
      });

    });

    it('createThree should call Recipe.store three times', function() {
      RecipesDevUtilsService.createThree();

      expect(recipeServiceMock.store.callCount).toEqual(3); //toHaveBeenCalled();
    });

    it('createTen should call Recipe.store ten times', function() {
      RecipesDevUtilsService.createTen();

      expect(recipeServiceMock.store.callCount).toEqual(10); //toHaveBeenCalled();
    });

});
