'use strict';

describe('Controller: NewVolunteerCtrl', function () {

  // load the controller's module
  beforeEach(module('conserjeApp'));

  var NewVolunteerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewVolunteerCtrl = $controller('NewVolunteerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
