'use strict';

/* jasmine specs for services go here */

function getElemByName(arrWithName, nameToFind) {
    for (var pos in arrWithName) {
        if (arrWithName[pos].name == nameToFind) {
            return arrWithName[pos];
        }
    }
    return null;
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
Recipe
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
describe('Recipe service', function() {
  var localStorage, $rootScope, recipeService;
  beforeEach(module('recsamApp'));

	beforeEach(function() {
	  localStorage = {
      recsam: '[{"id":"rec_20120222_1735_123", "name":"Pangkaka", "ingredientsList":["6 dl mjölk", "3 dl vetemjöl", "salt"], "tags":["vardag", "vegetariskt"]}, {"id":"rec_20120222_0202_101", "name":"Estrella-burgare", "ingredientsList":["400 g nötfärs", "salt och peppar", "chili"], "tags":["vardag", "fest", "kyckling"]}]'
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

    /*it('createId should return a string with format: rec_20120222_1735_123', function() {
      expect(recipeService.createId(new Date()).length > 16).toBe(true);
    });*/

    it('getAllTags should return an array containing all unique tags of all recipes and the default ones', function() {
      var tagsArr = recipeService.getAllTagsInUse();

      expect(tagsArr.length).toBe(4);

      expect(tagsArr).toContain('vardag'); // Från recept i localStorage
      expect(tagsArr).toContain('fest');
      expect(tagsArr).toContain('vegetariskt');
      expect(tagsArr).toContain('kyckling');
    });

    it('getAllTagsInUse should return an array containing all unique tags of all recipes in localStorage', function() {
      var tagsArr = recipeService.getAllTags();

      expect(tagsArr.length).toBe(11);

      expect(tagsArr).toContain('vardag'); // Från recept i localStorage
      expect(tagsArr).toContain('fest');
      expect(tagsArr).toContain('vegetariskt');
      expect(tagsArr).toContain('kyckling');
      expect(tagsArr).toContain('långkok'); // Från defaultTags
      expect(tagsArr).toContain('barnvänligt');
      expect(tagsArr).toContain('storkok');
    });

    it('store should add another recipe to localStorage', function() {
      expect(recipeService.allRecipes().length).toBe(2);
      var jsonString = {"id":null, "name":"Test-recept","ingredients":"1 dl vatten\n1 krm salt"};
      
      recipeService.store(jsonString);
      expect(recipeService.allRecipes().length).toBe(3);
      var elem = getElemByName(eval(localStorage.recsam),"Test-recept");
      expect(elem.id).not.toBeNull();
      expect(elem.id).not.toBeUndefined();
      expect(elem.ingredientsList.length).toBe(2);
    });

    it('update should update recipe in localStorage', function() {
      expect(recipeService.allRecipes().length).toBe(2);
      var jsonString = {"id":"rec_20120222_1735_123", "name":"Nytt namn","ingredients":"1 dl vatten\n1 krm salt"};
      
      recipeService.update(jsonString);
      expect(recipeService.allRecipes().length).toBe(2);
      var elem = getElemByName(eval(localStorage.recsam),"Nytt namn");
      expect(elem.id).not.toBeNull();
      expect(elem.id).not.toBeUndefined();
      expect(elem.ingredientsList.length).toBe(2);
      expect(elem.alias).toBe('nytt-namn');
    });

    it('update should throw exception if id doesnt exist in localStorage', function() {
      expect(recipeService.allRecipes().length).toBe(2);
      var jsonString = {"id":"non-existing-id", "name":"Nytt namn","ingredients":"1 dl vatten\n1 krm salt"};
      var exceptionThrown = false;
      try {
        recipeService.update(jsonString);
      } catch (err) {
        exceptionThrown = true;
      }
      expect(exceptionThrown).toBeTruthy();
    });

    it('getApprovedAlias should replace space with dash and make lower case', function() {
      var approvedAlias = recipeService.getApprovedAlias('test Lo Lo');
      expect(approvedAlias).toEqual('test-lo-lo');
    });
    
    it('getApprovedAlias should limit length to 25 chars', function() {
      var approvedAlias = recipeService.getApprovedAlias('1234567890 abcdefghij ABCDEFGHIJKL');
      expect(approvedAlias).toEqual('1234567890-abcdefghij-abc');
    });

    it('getApprovedAlias should ignore åäö', function() {
      var approvedAlias = recipeService.getApprovedAlias('test lä lå');
      expect(approvedAlias).toEqual('test-l-l');
    });

    it('getApprovedAlias should return empty string if only illegal chars', function() {
      var approvedAlias = recipeService.getApprovedAlias('å$∞@');
      expect(approvedAlias).toEqual('');
    });

    it('getApprovedAlias should accept null', function() {
      var approvedAlias = recipeService.getApprovedAlias(null);
      expect(approvedAlias).toEqual('');
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
MessageUtil
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
describe('MessageUtil service', function() {
  var messageUtilService;
  beforeEach(module('recsamApp'));

  beforeEach(function() {
      inject(function($injector) {
        messageUtilService = $injector.get('MessageUtil');
      });
    });

    it('MessageUtil should create object for severit ok', function() {
      var results = messageUtilService.getMessage('ok', 'Alright');

      expect(results.icon).toEqual('img/glyphicons_206_ok_2.png');
      expect(results.message).toEqual('Alright');
      expect(results.css).toEqual('alert alert-info');
    });

  it('MessageUtil should create object for severity error', function() {
      var results = messageUtilService.getMessage('error', 'An error message');

      expect(results.icon).toEqual('img/glyphicons_207_remove_2.png');
      expect(results.message).toEqual('An error message');
      expect(results.css).toEqual('alert');
    });

  it('MessageUtil should create object for severity warning', function() {
      var results = messageUtilService.getMessage('warning', 'A warning message');

      expect(results.icon).toEqual('img/glyphicons_205_electricity.png');
      expect(results.css).toEqual('alert');
    });

it('MessageUtil should create object for severity other', function() {
      var results = messageUtilService.getMessage('any-other-severity', 'A message');

      expect(results.icon).toEqual('img/glyphicons_245_chat.png');
      expect(results.css).toEqual('alert');
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
