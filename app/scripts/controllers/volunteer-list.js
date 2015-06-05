'use strict';

var conserje = angular.module('conserjeApp');

conserje.controller('VolunteerListCtrl', VolunteerListControllerBlock);

VolunteerListControllerBlock.$inject = ['$scope', '$resource', '$rootScope'];
function VolunteerListControllerBlock($scope, $resource, $rootScope) {
  var Volunteer = $resource('http://localhost:3000/employees/:volunteerId');

  var volunteers = Volunteer.query(function () {
      $scope.volunteers = volunteers;
  });
}
