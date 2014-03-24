'use strict';

angular.module('conserjeApp')
  .controller('NewVolunteerCtrl', function ($scope, $resource, $rootScope) {
    $scope.formData = {};
    $scope.alerts = [];
    var Volunteer = $resource('http://localhost:3000/employees/:volunteerId');
    
    var volunteers = Volunteer.query(function () {
        $scope.volunteers = volunteers;
    });
    
    $scope.processForm = function () {
        var newVolunteer = new Volunteer($scope.formData);
        newVolunteer.$save(function(newVolunteer, company, data) {
          console.log(newVolunteer);
          console.log($rootScope.company);
          $scope.formData = {};
          $scope.alerts.push({type: 'success', msg: "Welcome to " + $rootScope.company.name + ", " + newVolunteer.name + "! You are volunteer #" + newVolunteer.id + "."});
        });
        
    };
    
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  });
