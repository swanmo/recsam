'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {
  beforeEach(module('myApp.directives'));

  describe('app-version', function() {
    it('should print current version', function() {
      module(function($provide) {
        $provide.value('version', 'TEST_VER');
      });
      inject(function($compile, $rootScope) {
        var element = $compile('<span app-version></span>')($rootScope);
        expect(element.text()).toEqual('TEST_VER');
      });
    });
  });

  /*describe('pageUrlAsHtml', function() {
    it('should print pageUrl', function() {
      module(function($provide) {
        // $provide.value('version', 'TEST_VER');
      });
      inject(function($compile, $rootScope) {
        $rootScope.tester = function () {pageUrl:"kallee"};
        var $scope = {};
        $scope.tester = function () {pageUrl:"kallee"};
        //$rootScope.apply();
        var element = $compile('<span page-url-as-html page-url="tester"></span>')($rootScope, $scope);
        expect(element.text()).toEqual('kallee');
      });

    });
  });*/
});
