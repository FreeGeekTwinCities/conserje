'use strict';

describe('Controller: VolunteerTimesheetsCtrl', function () {

  // load the controller's module
  beforeEach(module('conserjeApp'));

  var VolunteerTimesheetsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VolunteerTimesheetsCtrl = $controller('VolunteerTimesheetsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
