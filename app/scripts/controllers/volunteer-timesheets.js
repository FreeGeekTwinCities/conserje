'use strict';

angular.module('conserjeApp')
  .controller('VolunteerTimesheetsCtrl', function ($scope, $resource, $filter, $routeParams, $rootScope) {
    $scope.volunteerId = $routeParams.volunteerId;
      
    var Volunteer = $resource('http://localhost:3000/employees/:volunteerId', {}, { 'get': {method:'GET', isArray: true}});
    
    var volunteer = Volunteer.get({volunteerId:$scope.volunteerId}, function () {
        $scope.volunteer = volunteer[0];
        console.log($scope.volunteer);
    });
      
    console.log($scope.volunteer);
    
    var Timesheet = $resource('http://localhost:3000/timesheets');
    
    var timesheets = Timesheet.query(function () {
        $scope.timesheets = timesheets;
    });
    
    $scope.gridOptions = { 
      data: 'timesheets',
      filterOptions: { filterText: 'employee_id:' + $scope.volunteerId },
      sortInfo: { fields: ['date_from'], directions: ['desc']},
      columnDefs: [{field:'date_from', displayName:'Date'}, {field:'total_attendance|number:2', displayName:'Hours Worked'}, {field:'employee_id', displayName:'id'}]
    };
  });
