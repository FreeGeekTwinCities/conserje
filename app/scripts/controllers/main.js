'use strict';

angular.module('conserjeApp')
  .controller('MainCtrl', function ($scope, $resource) {
    var Volunteer = $resource('http://localhost:3000/employees/:volunteerId');
    
    var volunteers = Volunteer.query(function () {
        $scope.volunteers = volunteers;
    });
    
    var Department = $resource('http://localhost:3000/departments');
    
    var departments = Department.query(function () {
        $scope.departments = departments;
    });
    
  });
