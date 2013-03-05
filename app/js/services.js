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

recsamApp.factory('MessageUtil', function(){
    return {
        getMessage: function(severity, messageString) {
            var messageIcon;
            var messageClass;
            switch (severity) {
                case "ok":
                    messageIcon = 'img/glyphicons_206_ok_2.png';
                    messageClass = 'alert alert-info';
                    break;
                case "warning":
                    messageIcon = 'img/glyphicons_205_electricity.png';
                    messageClass = 'alert';
                    break;
                case "error":
                    messageIcon = 'img/glyphicons_207_remove_2.png';
                    messageClass = 'alert';
                    break;
                default:
                    messageIcon = 'img/glyphicons_245_chat.png';
                    messageClass = 'alert';
                    break;
            }
            return {icon:messageIcon, css:messageClass, message:messageString};
    }
}});

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
        approvedChars: 'abcdefghiljklmnopqrstuvxyz1234567890-()',
        getApprovedAlias: function(recipeName) {
            var approvedAlias = '';
            if (!recipeName)
                return approvedAlias;
            for ( var i = 0; i < recipeName.length; i++ ) {
                var letter = recipeName.charAt(i).toLowerCase();
                if (letter == ' ' ) {
                    approvedAlias += '-';
                } else if (this.approvedChars.indexOf(letter) >=0 ) {
                    approvedAlias += letter;
                }
            }
            if (approvedAlias.length > 25) {
                approvedAlias = approvedAlias.substring(0, 25);
            }
            return approvedAlias;
        },
        getId: function() {
            var now = new Date();
            return '' + now.getFullYear() +
                now.getMonth() + '' +
                now.getDate() + '' +
                now.getMilliseconds() + Math.floor((Math.random()*100)+1);;
        },
        appendId:function(recipe) {
            recipe.id = this.getId();
        },
        appendAlias:function(recipe) {
            recipe.alias = this.getApprovedAlias(recipe.name);
        },
        store:function(recipe) {
            var now = new Date();
            recipe.createDate = now.getTime();
            this.appendId(recipe);
            this.appendAlias(recipe);
            recipe.ingredientsList = recipe.ingredients ? recipe.ingredients.split('\n') : [];
            var recipes = this.allRecipes();
            recipes.push(recipe);
            this.setAllRecipes(recipes);
        },
        update:function(recipe) {
            this.appendAlias(recipe);

            var posOfRecipe = this.positionOfRecipe(recipe.id);
            if (!posOfRecipe) {
                throw "RecipeId does not exist in local storage";
            }
            recipe.ingredientsList = recipe.ingredients ? recipe.ingredients.split('\n') : [];
            var allRecipes = this.allRecipes();
            allRecipes[posOfRecipe] = recipe;
            this.setAllRecipes(allRecipes);
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
                    ingredients:'6 dl mjölk\n3 dl vetemjöl\n2 ägg\n1 krm salt\ngrädde och sylt',
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
                    ingredients:'1 dl skalade räkor\n1 st tekaka\nmajonnäs\nsallad eller grön kvist som garnityr',
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
                    ingredientsList:'1 purjolök\n3 kycklingfiléer\n1-2 klyftor vitlök\n1dl mango chutney\nsalt och peppar',
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
                        ingredients:'salt\npeppar',
                        tags:['enkelt']
                    });
                this.sleep();
            }
        }
    }
});