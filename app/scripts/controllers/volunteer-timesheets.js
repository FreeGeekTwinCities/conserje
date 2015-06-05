'use strict';

var conserje = angular.module('conserjeApp');

conserje.controller('VolunteerTimesheetsCtrl', VolunteerTimesheetsControllerBlock);

VolunteerTimesheetsControllerBlock.$inject = ['$scope', '$resource', '$filter', '$routeParams', '$rootScope', 'Volunteer'];
function VolunteerTimesheetsControllerBlock($scope, $resource, $filter, $routeParams, $rootScope, Volunteer) {
  $scope.volunteerId = $routeParams.volunteerId;

  var volunteer = Volunteer.get({volunteerId:$scope.volunteerId}, function () {
      $scope.volunteer = volunteer[0];
  });

  var Timesheet = $resource('http://localhost:3000/employees/:volunteerId/attendance');

  var timesheets = Timesheet.get({volunteerId:$scope.volunteerId}, function () {
      $scope.timesheets = timesheets.timesheets;
  });

  $scope.gridOptions = {
    data: 'timesheets',
    sortInfo: { fields: ['date_from'], directions: ['desc']},
    columnDefs: [{field:'date_from', displayName:'Date'}, {field:'total_attendance|number:2', displayName:'Hours Worked'}, {field:'department_id[1]', displayName:'Work Area'}]
  };
}
