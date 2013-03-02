'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function() {
// describe('PhoneCat App', function() {
 
//   describe('Phone list view', function() {
 
//     beforeEach(function() {
//       browser().navigateTo('../../app/index.html');
//     });
 
 
//     it('should filter the phone list as user types into the search box', function() {
//       expect(repeater('.phones li').count()).toBe(3);
 
//       input('query').enter('nexus');
//       expect(repeater('.phones li').count()).toBe(1);
 
//       input('query').enter('motorola');
//       expect(repeater('.phones li').count()).toBe(2);
//     });
//   });
// });

  beforeEach(function() {
    // browser().navigateTo('/');
    browser().navigateTo('../../app/index.html');
    expect(browser().location().url()).toBe('/recipes');
  });


  it('should automatically redirect to /recipes when location hash/fragment is empty', function() {
    expect(browser().location().url()).toBe("/recipes");
  });


  describe('recipe', function() {

    beforeEach(function() {
      browser().navigateTo('/dev12repopulate');
      browser().navigateTo('../../app/index.html#/recipes');
      sleep(1);
    });
//       expect(repeater('.phones li').count()).toBe(1);

    it('should render ten recipes without filtering', function() {
      expect(repeater('.recipe-list-container').count()).toBe(10);
    });

    it('should filter when searching (case insensitive)', function() {
      input("query").enter("mango");
      sleep(1);
      expect(repeater('.recipe-list-container').count()).toBe(1);
    });

  });

});
