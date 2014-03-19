'use strict';

angular.module('conserjeApp')
  .controller('VolunteerTimesheetsCtrl', function ($scope, $resource, $filter, $routeParams) {
    var Timesheet = $resource('http://localhost:3000/timesheets');
    
    var timesheets = Timesheet.query(function () {
        $scope.timesheets = timesheets;
    });
    
    $scope.volunteerId = $routeParams.volunteerId;
    
    $scope.gridOptions = { 
      data: 'timesheets',
      filterOptions: { filterText: 'employee_id:' + $scope.volunteerId },
      sortInfo: { fields: ['date_from'], directions: ['desc']},
      columnDefs: [{field:'date_from', displayName:'Date'}, {field:'total_attendance|number:2', displayName:'Hours Worked'}, {field:'employee_id', displayName:'id'}]
    };
  });
