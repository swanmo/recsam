'use strict';

/* jasmine specs for services go here */



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
MenuUtils
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
describe('Menu util service', function() {
	var menuUtilService;

	beforeEach(module('recsamApp'));
 	beforeEach(function() {
		inject(function($injector) {
			menuUtilService = $injector.get('MenuUtils');
		});
	});

	it('menuUtils should return zero when asked to generate a random number lesser than zero', function() {
		expect(menuUtilService.randomNo(0)).toBe(0);
	});

	it('menuUtils should return zero when asked to generate a random number lesser than one (1)', function() {
		expect(menuUtilService.randomNo(1)).toBe(0);
	});

	it('menuUtils should return a number lesser than 3 when called with 3', function() {
		for (var i = 0; i  < 5; i++) {
			expect(menuUtilService.randomNo(3)).toBeLessThan(3);
		}
	});
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
Menu
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
describe('Menu service', function() {
	var $rootScope, recipeMockService, menuUtilMockService, menuService;

	var criteria1 = [{
		numberOfRecipes:'alla',
		tags:['vardag'],
		id:null,
		selectable:null
	},
	{
		numberOfRecipes:'1',
		tags:['fisk'],
		id:null,
		selectable:null
	}];

	var criteria2 = [{
		numberOfRecipes:'alla',
		tags:['vardag', 'test'],
		id:null,
		selectable:null
	},
	{
		numberOfRecipes:'1',
		tags:['fisk', 'fest'],
		id:null,
		selectable:null
	}];

	var criteria3 = [{ // 4
		numberOfRecipes:'alla',
		tags:['vardag', 'test'],
		id:null,
		selectable:null,
		matchingRecipes:[{name:'a1', id:'i1'}, {name:'a2', id:'i2'}, {name:'a3', id:'i3'}]
	},
	{
		numberOfRecipes:'2', //1
		tags:['fisk', 'fest'],
		id:null,
		selectable:null,
		matchingRecipes:[{name:'b1', id:'i1'}]
	},
	{
		numberOfRecipes:'1',
		tags:['fisk', 'fest'],
		id:null,
		selectable:null,
		matchingRecipes:[{name:'r1', id:'i1'}]
	}];

	var criteria4 = [{
		numberOfRecipes:'1',
		tags:['vardag', 'test'],
		id:null,
		selectable:null,
		matchingRecipes:[{name:'a1', id:'i1'}, {name:'a2', id:'i2'}, {name:'a3', id:'i3'}],
		selectedRecipes:[{name:'a1', id:'i1'}]
	},
	{
		numberOfRecipes:'alla',
		tags:['fisk', 'fest'],
		id:null,
		selectable:null,
		matchingRecipes:[{name:'b1', id:'i1'}],
		selectedRecipes:[{name:'b1', id:'i1'}]
	},
	{
		numberOfRecipes:'3',
		tags:['fisk', 'fest'],
		id:null,
		selectable:null,
		matchingRecipes:[{name:'b1', id:'i1'}, {name:'b2', id:'i2'}, {name:'b3', id:'i3'}, {name:'b4', id:'i4'}],
		selectedRecipes:[{name:'b3', id:'i3'}, {name:'b4', id:'i4'}, {name:'b1', id:'i1'}]
	}];

	beforeEach(module('recsamApp'));

	beforeEach(function() {
		menuUtilMockService = {
			randomNo: function(_largest) { return _largest > 2 ? 2 : 0;}
		}
		recipeMockService = {
			allRecipes: function () {
				return [{id:'rec_20120222_1735_000', name:'Oxfilé', tags:['fest']},
					{id:'rec_20120222_1735_111', name:'Helleflundra', tags:['fest', 'fisk', 'test'], rating:null},
					{id:'rec_20120223_1435_222', name:'Pangkaka', tags:['vardag', 'test'], rating:'1'},
					{id:'rec_20120224_1735_333', name:'Kyckling', tags:['vardag', 'test'], rating:'1'},
					{id:'rec_20120225_1735_444', name:'Kräftstjärtar', tags:['vardag', 'test'], rating:'1'},
					{id:'rec_20120226_1735_555', name:'Ungspannkaka', tags:['vardag', 'test'], rating:'2'},
					{id:'rec_20120227_1735_666', name:'Spättafilé', tags:['vardag', 'fisk'], rating:'3'},
					{id:'rec_20120228_1735_777', name:'Våfflor', tags:['vardag', 'efterrätt'], rating:'4'},
					{id:'rec_20120301_1735_888', name:'Carbonara', tags:['vardag', 'italienskt'], rating:'5'}];
			}
		};
	 
		module(function($provide) {
			$provide.value('$rootScope', {});
			$provide.value('Recipe', recipeMockService);
			$provide.value('MenuUtils', menuUtilMockService);
		});
	 
		inject(function($injector) {
			menuService = $injector.get('Menu');
		});

	});

	it('getAllRecipes should ignore minNoOfStars if undefined', function() {
		var results = menuService.getAllRecipes(recipeMockService.allRecipes());
		
		expect(results.length).toBe(9);

	});

	it('getAllRecipes should honor minNoOfStars if defined', function() {
		var results = menuService.getAllRecipes(recipeMockService.allRecipes(), 4);
		
		expect(results.length).toBe(2);
	});

	it('enumerateCriteria should assign a number to each criterion', function() {
		menuService.enumerateCriteria(criteria1);
		expect(criteria1.length).toBe(2);
		
		expect(criteria1[0].no).toBe(0);
		expect(criteria1[0].matchingRecipes).not.toBeUndefined()
		expect(criteria1[0].matchingRecipes.length).toBe(0);

		expect(criteria1[1].no).toBe(1);
		expect(criteria1[1].matchingRecipes).not.toBeUndefined()
		expect(criteria1[1].matchingRecipes.length).toBe(0);
	});

	it('assignMatchingRecipes should find matching recipes for every criterion', function() {
		menuService.assignMatchingRecipes(criteria1, recipeMockService.allRecipes());

		expect(criteria1[0].matchingRecipes.length).toBe(7); //vardag

		expect(criteria1[1].matchingRecipes.length).toBe(2); //fisk
	});

	it('assignMatchingRecipes should find matching recipes for every criterion, with multiple tags', function() {
		menuService.assignMatchingRecipes(criteria2, recipeMockService.allRecipes());

		expect(criteria2[0].matchingRecipes.length).toBe(4); //vardag, test

		expect(criteria2[1].matchingRecipes.length).toBe(1); //fisk, fest
	});
/*
var criteria3 = [{ // 4
		numberOfRecipes:'alla',
		tags:['vardag', 'test'],
		id:null,
		selectable:null,
		matchingRecipes:[{name:'a1', id:'i1'}, {name:'a2', id:'i2'}, {name:'a3', id:'i3'}]
	},
	{
		numberOfRecipes:'2', //1
		tags:['fisk', 'fest'],
		id:null,
		selectable:null,
		matchingRecipes:[{name:'b1', id:'i1'}]
	},
	{
		numberOfRecipes:'1',
		tags:['fisk', 'fest'],
		id:null,
		selectable:null,
		matchingRecipes:[{name:'r1', id:'i1'}]
	}];
*/
	it('sortByFrequence should sort criteria, rarest first', function() {
		menuService.numberOfMealsInTotal = 44;

		menuService.sortByFrequence(criteria3);

		expect(criteria3[0].numberOfRecipes).toBe('alla');

		expect(criteria3[1].numberOfRecipes).toBe('2');

		expect(criteria3[2].numberOfRecipes).toBe('1');

	});

	it('containsRecipe should return true if array contains recipe, matched by id', function() {
		expect(menuService.containsRecipe(recipeMockService.allRecipes(), {id:'rec_20120222_1735_000'})).toBe(true);
		expect(menuService.containsRecipe(recipeMockService.allRecipes(), {id:'rec_20120225_1735_444'})).toBe(true);
		expect(menuService.containsRecipe(recipeMockService.allRecipes(), {id:'rec_20120301_1735_888'})).toBe(true);
	});

	it('containsRecipe should return false if array doesnt contain recipe, matched by id', function() {
		expect(menuService.containsRecipe(recipeMockService.allRecipes(), {id:'rec_20120222_1735_001'})).toBe(false);
		expect(menuService.containsRecipe(recipeMockService.allRecipes(), {id:'rec_20120225_1735_xxx'})).toBe(false);
		expect(menuService.containsRecipe(recipeMockService.allRecipes(), {id:'rec_'})).toBe(false);
	});

	it('getRandomSelection should select one recipe, at (not random) position 0', function() {
		menuService.numberOfMealsInTotal = 3;
		expect(menuService.getRandomSelection(criteria4[0])[0].id).toBe('i3');
	});

	it('getRandomSelection should select one recipe, whene matchingRecipes has a length of one(1)', function() {
		menuService.numberOfMealsInTotal = 3;
		expect(menuService.getRandomSelection(criteria4[1]).length).toBe(1);
	});
	it('getRandomSelection should select three recipes, at position 0-2', function() {
		menuService.numberOfMealsInTotal = 3;
		var results = menuService.getRandomSelection(criteria4[2]);
		expect(results.length).toBe(3);
		expect(results[0].id).toBe('i3');
		expect(results[1].id).toBe('i4');
		expect(results[2].id).toBe('i1');
	});
	
	it('totalNumberOfSelectedRecipes should sum up all lengths of the selectedRecipes-arrays', function() {
		expect(menuService.totalNumberOfSelectedRecipes(criteria4)).toBe(5);
	});

	
});