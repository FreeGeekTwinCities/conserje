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

  $scope.total_time_display = "Loading...";
  $scope.total_min = 0;
  var timesheets = Timesheet.get({volunteerId:$scope.volunteerId}, function () {
      $scope.timesheets = timesheets.timesheets;
      $.each($scope.timesheets, function(index, timesheet) {
        $scope.total_min += timesheet.total_attendance;
        timesheet.total_attendance = calcTime(timesheet.total_attendance);
        $scope.timesheets[$scope.timesheets.indexOf(timesheet)] = timesheet;
      });
      $scope.total_time_display = calcTime($scope.total_min);
  });

  function calcTime(total_attendance) {
    var hours = Math.floor(total_attendance) > 0 ?
                  Math.floor(total_attendance) + ' hr(s) '
                  : '';
    var mins = Math.round(((total_attendance - Math.floor(total_attendance)) * 60)) + ' mins';
    //console.log("Total attendance : " + hours + mins);
    return hours + mins;
  }

  $scope.gridOptions = {
    data: 'timesheets',
    sortInfo: { fields: ['date_from'], directions: ['desc']},
    columnDefs: [
      {field:'date_from', displayName:'Date'},
      {field:'total_attendance', displayName:'Hours Worked'},
      {field:'department_id[1]', displayName:'Work Area'}
      ]
  };
}
