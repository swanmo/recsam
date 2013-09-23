recsamApp.factory('MenuUtils', function(){
    return {
        randomNo: function(largest) {
            return Math.floor(Math.random() * largest);
        }
    }
});

recsamApp.factory('Menu', function(Recipes, MenuUtils){
    return {
        numberOfMealsInTotal: 5,
        suggestedTags:['enkelt', 'vardag', 'vegetariskt', 'fisk'],
        /*getAllTagsInUse:function() {
            var allTagsInUse = this.getAllTagsInRecipes();
            return allTagsInUse.
                filter(function(elem, pos, self) {

                    return self.indexOf(elem) == pos;
                });
        },*/
        /*getAllTagsInRecipes:function() {
            var recipesArr = this.allRecipes();
            var tagArr = [];
            for (var pos in recipesArr) {
                if (recipesArr[pos].tags && recipesArr[pos].tags.length) {
                    
                    for (var tagPos in recipesArr[pos].tags) {
                        tagArr.push(recipesArr[pos].tags[tagPos]);
                    }
                }
            }
            return tagArr;
        },*/
        /*getAllTags:function() {
            return this.getAllTagsInRecipes().concat(this.defaultTags).
                filter(function(elem, pos, self) {
                    return self.indexOf(elem) == pos;
                });
        },*/
        /*
            {numberOfRecipes:"minst 1",
            tags:{selected:arrSuggestions},
            id:'sel1_' + ($scope.includingSelections.length + 1),
            selectable: $scope.selectableTags}
        
        */
        enumerateCriteria: function(menuCriteria) {
            for (var pos in menuCriteria) {
                // menuCriteria[pos].no = parseInt(pos);
                menuCriteria[pos].matchingRecipes = [];
                menuCriteria[pos].selectedRecipe = null;
                menuCriteria[pos].unfulfilled = false;
                if (!menuCriteria[pos].tags) {
                    menuCriteria[pos].tags = [];
                }
            }
        },
        containsAll: function(tagArrToScan, tagArrToFind) {
            for(pos in tagArrToFind) {
                if (tagArrToScan.indexOf(tagArrToFind[pos]) < 0) {
                    return false;
                }
            }
            return true;
        },
        containsRecipe: function(arrRecipes, recipeToFind) {
            for(pos in arrRecipes) {
                if (arrRecipes[pos].id == recipeToFind.id) {
                    return true;
                }
            }
            return false;
        },
        assignMatchingRecipes: function(menuCriteria, recipes) {
            for (var criteriaPos in menuCriteria) {
                menuCriteria[criteriaPos].matchingRecipes = this.getMatchingRecipes(recipes, menuCriteria[criteriaPos].tags);
            }
        },
        getMatchingRecipes: function(_recipes, tags) {
            var me = this;
            return _recipes.filter(function(elem, pos, self) {
                    return me.containsAll(elem.tags, tags);
                });
        },
        numberOfRecipesAsInt: function(_numberOfRecipes) {
            var numberOfRecipesInt = 1;
            
            if(_numberOfRecipes == 'alla') {
                numberOfRecipesInt = this.numberOfMealsInTotal;
            } else {
                numberOfRecipesInt = parseInt(_numberOfRecipes);
            }
            return numberOfRecipesInt;
        },
        /*getLikeliness: function(criteria) {
            // alert("Likliness " + criteria.matchingRecipes.length + "/" + this.numberOfRecipesAsInt(criteria.numberOfRecipes) + "=" + (criteria.matchingRecipes.length / this.numberOfRecipesAsInt(criteria.numberOfRecipes)));
            return criteria.matchingRecipes.length / this.numberOfRecipesAsInt(criteria.numberOfRecipes);
        },
        sortByFrequence: function(menuCriteria) {
            var me = this;
            menuCriteria = menuCriteria.sort(function(criteria1, criteria0) {
                return me.getLikeliness(criteria1) - me.getLikeliness(criteria0);
            })
        },*/
        getAllRecipes: function(recipes, _minNoOfStars) {
            if(_minNoOfStars && _minNoOfStars > 0) {
                var __minNoOfStars = _minNoOfStars;
                return recipes.filter(function(elem, pos, self) {
                    return elem.rating >= __minNoOfStars;
                });
            } else {
                return recipes;
            }
        },
        getRandomSelection:function(menuCriteria, accumulatedTags) {
            var recipes;
            // 1) Find the recipes to operate on...
            if (accumulatedTags && accumulatedTags.length > 0) {
                recipes = this.getMatchingRecipes(menuCriteria.matchingRecipes, accumulatedTags);
            } else {
                recipes = menuCriteria.matchingRecipes;
            }
            // 2) Check if there are any such recipes, intersecting both the set of menuCriteria and the ones from accumulatedTags
            if (recipes.length < 1) {
                console.log("Impossible to find intersection of tags for criteria: " + menuCriteria.tags + " and " + accumulatedTags);
                return [];
            }
            var randomizedRecipes = [];
            // 3) Make random selection from the remaining ones if any

            var wantedNumberOfRecipes = this.numberOfRecipesAsInt(menuCriteria.numberOfRecipes);

            for (var i = 0; i < wantedNumberOfRecipes; i++) {
                var randomPos = MenuUtils.randomNo(menuCriteria.matchingRecipes.length);
                var j = 0, nextPos = randomPos;

                while(j < menuCriteria.matchingRecipes.length) {

                    if (!this.containsRecipe(randomizedRecipes, menuCriteria.matchingRecipes[nextPos])) {
                        randomizedRecipes.push(menuCriteria.matchingRecipes[nextPos]);
                        j = menuCriteria.matchingRecipes.length; // Cause the loop to end
                    }
                    nextPos = (randomPos + (++j)) % menuCriteria.matchingRecipes.length;
                }
            }

            return randomizedRecipes;
        },
        /*totalNumberOfSelectedRecipes:function(menuCriteria) {
            var total = 0;
            for(pos in menuCriteria) {
                total += menuCriteria[pos].selectedRecipes.length;
            }
            return total;
        },
        assignRecipesForCriteria:function(totalNumberOfMeals, menuCriteria, criteriaPos) {
            var recipes = getRandomSelection(menuCriteria[criteriaPos], []);
            menuCriteria[criteriaPos].selectedRecipes = recipes;

            if (recipes.length < this.numberOfRecipesAsInt(menuCriteria[criteriaPos].numberOfRecipes)) {
                // There's simply not enough matching recipes for this condition...
                menuCriteria[criteriaPos].unfulfilled = true;
            }
            if (totalNumberOfMeals < this.totalNumberOfSelectedRecipes(menuCriteria) ) {
                var prevPos = criteriaPos;
                while(--prevPos >= 0) {

                }
                // Sammanlagt för många recept... Vi måste finna recept som matchar flera villkor.
            }
        },*/
        getRecipesForCriteria:function(totalNumberOfMeals, menuCriteria, criteriaPos, accumulatedTags) {
            var recipes = getRandomSelection(menuCriteria[criteriaPos], accumulatedTags);

            
            // Om antal ok, return
            // KOntrollera matchingRecipes efter recept som matchar menuCriteria[criteriaPos-n], och som INTE ingår i menuCriteria[criteriaPos-(n + x)]

        },
        /*
                    {no:($scope.selectionsPerRecipe.length + 1),
                    tags:{selected:arrSuggestions},
                    id:'sel1_' + ($scope.selectionsPerRecipe.length + 1),
                    selectable: $scope.selectableTags}
        */
        /*
        tagsInAllRecipes:[],
        menuCriteriaPerRecipe:[],
        numberOfMeals:4
        minNoOfStars:5
        */
        createMenu:function(cond) {
            /*1 för varje dag {
                2.1 VÄLJ första recept som inte tidigare är använt
                2.2. om inget sådant finns {
                    2.2.1 kontrollera om något finns som är tidigare använt
                    2.2.2 VÄLJ receptet och gör om enligt 2.1 för den dag vilken vi snodde
                }

            }


            enumerateCriteria(numberOfMeals, cond.menuCriteriaPerRecipe);
            var allRecipes = this.getAllRecipes(Recipe.allRecipes(), minNoOfStars);

            if (cond.tagsInAllRecipes && cond.tagsInAllRecipes.length > 0) {
               allRecipes = this.getMatchingRecipes(allRecipes, cond.tagsInAllRecipes);
            }

            assignMatchingRecipes(cond.menuCriteriaPerRecipe, allRecipes);


            for (var i = 0;cond.numberOfMeals; i++) {
                var matchingRecipesExists = (cond.menuCriteriaPerRecipe[i].matchingRecipes.length > 0);

                var selectedRecipe = this.getRandomRecipe(cond.menuCriteriaPerRecipe, i);
                if (!selectedRecipe && matchingRecipesExists) {
                    for (var j = i; i >= 0; j--) {
                        if (this.containsRecipe(cond.menuCriteriaPerRecipe[j].selectedRecipe, 
                                cond.menuCriteriaPerRecipe[i].matchingRecipes) {


                        }
                    };
                    //Steal back recipe
                }
                
            };

           */ 
        }
    }    
});
