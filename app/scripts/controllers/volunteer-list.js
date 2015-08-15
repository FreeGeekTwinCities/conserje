'use strict';

var conserje = angular.module('conserjeApp');

conserje.controller('VolunteerListCtrl', VolunteerListControllerBlock);

VolunteerListControllerBlock.$inject = ['$scope', '$resource', '$rootScope', 'config'];
function VolunteerListControllerBlock($scope, $resource, $rootScope, config) {
  var Volunteer = $resource('http://' + config.api.host + ':' + config.api.port + '/employees/:volunteerId');

  var volunteers = Volunteer.query(function () {
      $scope.volunteers = volunteers;
  });
}
