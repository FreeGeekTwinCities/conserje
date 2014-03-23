'use strict';

angular.module('conserjeApp')
  .controller('VolunteerListCtrl', function ($scope, $resource, $rootScope) {
    var Volunteer = $resource('http://localhost:3000/employees/:volunteerId');
    
    var volunteers = Volunteer.query(function () {
        $scope.volunteers = volunteers;
    });
  });
