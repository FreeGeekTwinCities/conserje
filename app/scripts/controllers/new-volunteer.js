'use strict';

angular.module('conserjeApp')
  .controller('NewVolunteerCtrl', function ($scope, $resource) {
    $scope.formData = {};
    $scope.alerts = [];
    var Volunteer = $resource('http://localhost:3000/employees/:volunteerId');
    
    var volunteers = Volunteer.query(function () {
        $scope.volunteers = volunteers;
    });
      
    $scope.processForm = function () {
        var newVolunteer = new Volunteer($scope.formData);
        newVolunteer.$save(function(newVolunteer, data) {
          console.log(newVolunteer);
          $scope.formData = {};
          $scope.alerts.push({type: 'success', msg: "Welcome to Free Geek, " + newVolunteer.name + "! You are volunteer #" + newVolunteer.id + "."});
        });
        
    };
    
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  });
