'use strict';

angular.module('conserjeApp')
  .controller('MainCtrl', function ($scope, $resource) {
    var Volunteer = $resource('http://localhost:3000/employees/:volunteerId');
    
    var volunteers = Volunteer.query(function () {
        $scope.volunteers = volunteers;
    });
    
    var Timesheet = $resource('http://localhost:3000/timesheets');
    
    var timesheets = Timesheet.query(function () {
        $scope.timesheets = timesheets;
    });
    
  });
