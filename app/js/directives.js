'use strict';

/* Directives */


angular.module('myApp.directives', []).
	directive('starAsHtml', function() {
		return function(scope, elm, attrs) {
			var starsHtml =  [];
			var ratingNumber = scope.$eval(attrs.rating);

			for(var count = 0; count < 5; count++) {
				starsHtml.push("<img src='");
				if (ratingNumber > count) {
					starsHtml.push("img/glyphicons_049_star.png");
				} else {
					starsHtml.push("img/glyphicons_048_dislikes.png");
				}
				starsHtml.push("' alt='");
				starsHtml.push(ratingNumber);
				starsHtml.push(" stjärnor'>");
			}
			elm.html(starsHtml.join(''));
		};
	}).
	directive('pageUrlAsHtml', function() {
		return function(scope, elm, attrs) {
			var pageUrl = scope.$eval(attrs.pageUrl);
			var html =  [];
			if (pageUrl && (pageUrl.indexOf("www") > -1)) {
				html.push("<a href='");
				var linkTarget = (pageUrl.indexOf("http") == 0) ? "" : "http:\\";
				linkTarget += pageUrl;
				html.push(linkTarget);
				html.push("'>");
				if (pageUrl.length > 50) {
					pageUrl = pageUrl.substr(0, 50);
					pageUrl += "...";
				}
				html.push(pageUrl);
				html.push("</a>");
			} else {
				html.push(pageUrl);
			}

			elm.html(html.join(''));
		};
	}).

directive('tagmanager', function($rootScope) {
		var linkFn = function(scope, element, attrs) {
			// console.log("inputid   : " + attrs.inputid + " =====================");
			// console.log("tags      : " + scope.selectedtags.selected + ", resolved: " + scope.$eval(scope.selectedtags));
			// console.log("selectable: " + attrs.selectable + ", resolved: " + scope.$eval(attrs.selectable));


			var bindTags = function(_scope, _inputid) {
				var selectedTags = $("#" + _inputid).tagit("assignedTags");
				console.log('onTagAdded: ' + _inputid + "; " + selectedTags);

				_scope.selectedtags.selected = selectedTags;
				if(_scope.$$phase) {
				  _scope.$digest();
				}
			}

			var setItUp = function() {
				var input = element.children()[0];
				$(input).val(scope.selectedtags.selected);
				var setupOngoing = true;

				$(input).tagit({
						readOnly: false,
						availableTags: scope.selectable,
						removeConfirmation: true,
						onTagAdded: function(event, tag) {
							if (!setupOngoing) {
								bindTags(scope, inputId);
							}
						},
						onTagRemoved: function(event, tag) {
							bindTags(scope, inputId);
						}
				});
				setupOngoing = false;
			}

			attrs.$observe("selectable", function(value) {
				if(value) {
					setItUp();
				}					
			});

			var inputId;

			attrs.$observe("inputid", function(value) {
				if(value) {
					inputId = value;
				}					
			});

		};
		return {
			link: linkFn,
			restrict: 'E',
			scope: {
				selectedtags: '=tags',
				inputid: '@',
				selectable: '=selectable'
			},
			template: '<input type="text" id="{{inputid}}" class="tagManager"/>',
			transclude: true
		};
	}).
	directive('stargazer', function($rootScope) {
		var linkFn = function(scope, element, attrs) {

				function starClicked() {
						console.log('click star');
						// scope.$apply('rating = 1');
				}

				function indicate(rating) {
					console.log("indicate " + rating + " stars");

					$(".starsSel div").each(function( index ) {
						if (index < rating) {
							$(this).removeClass("unselected").addClass("selected");
						} else {
							$(this).removeClass("selected").addClass("unselected");
						}
					});
				}
				var divs = element.children()[0].children;

				angular.element(divs[0]).bind("click", function() {console.log("star 1"); scope.$apply('rating = 1');indicate(scope.rating);});
				angular.element(divs[1]).bind("click", function() {console.log("star 2"); scope.$apply('rating = 2');indicate(scope.rating);});
				angular.element(divs[2]).bind("click", function() {console.log("star 3"); scope.$apply('rating = 3');indicate(scope.rating);});
				angular.element(divs[3]).bind("click", function() {console.log("star 4"); scope.$apply('rating = 4');indicate(scope.rating);});
				angular.element(divs[4]).bind("click", function() {console.log("star 5"); scope.$apply('rating = 5');indicate(scope.rating);});
				indicate(scope.rating);
		};
		return {
				link: linkFn,
				restrict: 'E',
				scope: {
						rating: '='
				},
				template: '<div class="starsSel" title="{{rating}} stjärnor"><div id="starSel1" class="selected"></div><div id="starSel2" class="selected"></div><div id="starSel3" class="selected"></div><div id="starSel4" class="selected"></div><div id="starSel5" class="selected"></div></div>',
				transclude: true
		};
	})./*
	directive('animate', ['$value', '$defer', function(value, $defer) {
		return function(scope, element, attrs) {
			$defer(function() {
				console.log("sdfdsdfs");
				element.addClass(value);
			});
		}
	}]).*/

	directive('appVersion', ['version', function(version) {
		return function(scope, elm, attrs) {
			elm.text(version);
		};
	}]);

recsamApp.directive('starNumber', function factory($compile) {


		var linker = function(scope, element, attrs) {


				element.html("<p>template stuff</p>").show();

				$compile(element.contents())(scope);
		}

		return {
				restrict: "AE",
				replace: true,
				link: linker,
				scope: {
						content:'='
				}
		};
});

	/*return function(scope, element, attrs) {
		alert("directove");
			// used to update the UI
			
				element.text("kalle");
			

		};*/

/*
	var directiveDefinitionObject = {
		priority: 0,
		template: '<div>11111</div>',
		replace: true,
		transclude: false,
		restrict: 'A',
		scope: false,
		compile: function compile(tElement, tAttrs, transclude) {
			return {
				pre: function preLink(scope, iElement, iAttrs, controller) {  },
				post: function postLink(scope, iElement, iAttrs, controller) {  }
			}
		},
		link: function postLink(scope, iElement, iAttrs) {  }
	};
	return directiveDefinitionObject;
}*/
