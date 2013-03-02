'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');


/*var recsamModule = angular.module('recsamServices', ['ngResource']).
    factory('Recipe', function($resource){
  return $resource('recipes-mock/:recipeId.json', {}, {
    query: {method:'GET', params:{recipeId:'all'}, isArray:true}
  });
});*/

recsamApp.value('localStorage', window.localStorage);

var lsKey = 'recsam';

recsamApp.factory('Recipes', function(localStorage){
    return {
        dummy:function() {
            alert("dummy call " + localStorage);
            return "hello";
        },
        allRecipes:function() {
            var storageStr = localStorage[lsKey];
            var recipesArr;
            if (!storageStr) {
                recipesArr = [];
            } else {
                recipesArr = JSON.parse(storageStr);
            }
            /*angular.forEach(recipesArr, function(recipe) {
              recipe.isPageUrl = function() {
                return recipe.pageUrl.indexOf

              };
            });*/
            return recipesArr;
        },
        setAllRecipes:function(recipesArr) {
            localStorage[lsKey] = JSON.stringify(recipesArr);
        },
        positionOfRecipe:function(_id_) {

            var recipesArr = this.allRecipes();
            for (var pos in recipesArr) {
                if (recipesArr[pos].id == _id_) {
                    return pos;
                }
            }
            return null;
        },
        query:function() { 
            return this.allRecipes(); 
        },
        delete:function(_id_) {
            var posOfRecipe = this.positionOfRecipe(_id_);
            if (posOfRecipe) {
                var recipesArr = this.allRecipes();
                recipesArr.splice(posOfRecipe, 1);
                this.setAllRecipes(recipesArr);
            }
        },
        get:function(_id_) {
            var posOfRecipe = this.positionOfRecipe(_id_);
            if (posOfRecipe) {
                var r = this.allRecipes()[posOfRecipe];
                if (r.ingredientsList)
                    r.ingredients = r.ingredientsList.join('\n');
                return r;

            } else {
                return null;
            }
        },
        createId:function(now) {

            return "rec_" + 
                now.getFullYear() +
                now.getMonth() +
                now.getDate() + 
                "_" +
                now.getHours() +
                now.getMinutes() +
                "_" +
                now.getMilliseconds();
        },
        store:function(recipe) {
            var now = new Date();
            recipe.id = this.createId(now);
            recipe.createDate = now.getTime();
            var recipes = this.allRecipes();
            recipes.push(recipe);
            this.setAllRecipes(recipes);
        }
    }
    
});

recsamApp.factory('RecipeUtils', function(){
    return {
        ingredientsAsHtml: function(recipe) {
            if (recipe.ingredients)

                recipe.ingredients = recipe.ingredients.replace(/\n/g, '<br>')
            return recipe;
        }

    }
});

recsamApp.factory('RecipesDevUtils', function(Recipes){
    return {
        sleep: function() {
            var date = new Date();
            var curDate = null;
            do { curDate = new Date(); }
            while(curDate - date < 20);
        },
        clearAll: function() {
            var allRecipes = Recipes.query();
            for (var pos in allRecipes) {
                Recipes.delete(allRecipes[pos].id);
            }
        },
        createThree:function() {
            Recipes.store(
                {
                    id:null,
                    name:'Pangkaka',
                    servingNo:'2',
                    cookingMinutes:'25',
                    pageUrl:'www.arla.se',
                    description:'Blanda ingredienserna och rör tills smeten är klumpfri. Låt helst smeten vila 1 timme.\nStek i flytande margarin.',
                    rating:'3',
                    ingredientsList:['6 dl mjölk', '3 dl vetemjöl', '2 ägg', '1 krm salt', 'grädde och sylt'],
                    tags:['enkelt']
                }
            );
            this.sleep();
            Recipes.store(
                {
                    id:null,
                    name:'Räksmörgås',
                    servingNo:'1',
                    cookingMinutes:'10',
                    pageUrl:'www.husqvarna.se',
                    description:'Bred smör på macka. Lägg på räkor och majonnäs. Toppa med ett salladsblad.',
                    rating:'2',
                    ingredientsList:['1 dl skalade räkor', '1 st tekaka', 'majonnäs', 'sallad eller grön kvist som garnityr'],
                    tags:['enkelt']
                }
            );
            this.sleep();
            Recipes.store(
                {
                    id:null,
                    name:'Mango chutney kyckling',
                    servingNo:'3',
                    cookingMinutes:'30',
                    pageUrl:'Egen samling',
                    description:'Hacka purjo och ev. gul lök. Stek kyckling och purjo. Sätt på pasta under tiden.\nHäll på grädde och tillsätt vitlök, mango chutney och buljongtärning. Krydda ev. med salt och peppar.',
                    rating:'2',
                    ingredientsList:['1 purjolök', '3 kycklingfiléer', '1-2 klyftor vitlök', '1dl mango chutney', 'salt och peppar'],
                    tags:['vardag', 'kyckling']
                }
            );
        },
        createTen: function() {
            this.createThree();
            for(var i = 0;i< 7; i++) {
                Recipes.store(
                    {
                        id:null,
                        name:'Recept-' + i,
                        servingNo:'' + i,
                        cookingMinutes:'30' + i,
                        pageUrl:'Egen samling',
                        description:'Gå på känn och krydda på en höft. Tillsätt ingredienser beroende på vad huset har att erbjuda och krydda efter behag.',
                        rating:'1',
                        ingredientsList:['salt', 'peppar'],
                        tags:['enkelt']
                    });
                this.sleep();
            }
        }
    }
});