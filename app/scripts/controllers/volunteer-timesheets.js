'use strict';

var conserje = angular.module('conserjeApp');

conserje.controller('VolunteerTimesheetsCtrl', VolunteerTimesheetsControllerBlock);

VolunteerTimesheetsControllerBlock.$inject = ['$scope', '$resource', '$filter', '$routeParams', '$rootScope', 'Volunteer', 'config'];
function VolunteerTimesheetsControllerBlock($scope, $resource, $filter, $routeParams, $rootScope, Volunteer, config) {
  $scope.volunteerId = $routeParams.volunteerId;

  var volunteer = Volunteer.get({volunteerId:$scope.volunteerId}, function () {
      $scope.volunteer = volunteer[0];
  });

  var Timesheet = $resource('http://' + config.api.host + ':' + config.api.port + '/employees/:volunteerId/attendance');

  var timesheets = Timesheet.get({volunteerId:$scope.volunteerId}, function () {
      $scope.timesheets = timesheets.timesheets;
      $.each($scope.timesheets, function(index, timesheet) {
        var hours = Math.floor(timesheet.total_attendance / 60) > 0 ? Math.floor(timesheet.total_attendance / 60) + ' hr(s) ' : '';
        var mins = Math.round(timesheet.total_attendance % 60) + ' mins';
        timesheet.total_attendance = hours + mins;
        $scope.timesheets[$scope.timesheets.indexOf(timesheet)] = timesheet;
      });
  });

  $scope.gridOptions = {
    data: 'timesheets',
    sortInfo: { fields: ['date_from'], directions: ['desc']},
    columnDefs: [{field:'date_from', displayName:'Date'}, {field:'total_attendance', displayName:'Hours Worked'}, {field:'department_id[1]', displayName:'Work Area'}]
  };
}
