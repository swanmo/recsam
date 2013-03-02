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
