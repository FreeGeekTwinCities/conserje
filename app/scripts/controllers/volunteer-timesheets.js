'use strict';

angular.module('conserjeApp')
  .controller('VolunteerTimesheetsCtrl', function ($scope, $resource) {
    var Timesheet = $resource('http://localhost:3000/timesheets');
    
    var timesheets = Timesheet.query(function () {
        $scope.timesheets = timesheets;
    });
    
    $scope.gridOptions = { 
      data: 'timesheets',
      sortInfo: { fields: ['date_from'], directions: ['desc']},
      columnDefs: [{field:'date_from', displayName:'Date'}, {field:'total_attendance|number:2', displayName:'Hours Worked'}]
    };
  });
