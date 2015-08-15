'use strict';

var conserje = angular.module('conserjeApp');

conserje.controller('NewVolunteerCtrl', NewVolunteerControllerBlock);

NewVolunteerControllerBlock.$inject = ['$scope', '$resource', '$rootScope', '$location', 'config'];
function NewVolunteerControllerBlock($scope, $resource, $rootScope, $location, config) {
  $scope.formData = {};
  $scope.alerts = [];

  $scope.go = function(path) {
    $location.path(path);
  };

  var Volunteer = $resource('http://' + config.api.host + ':' + config.api.port + ':3000/employees/:volunteerId');

  var volunteers = Volunteer.query(function () {
      $scope.volunteers = volunteers;
  });

  $scope.processForm = function () {
      var newVolunteer = new Volunteer($scope.formData);
      newVolunteer.$save(function(newVolunteer, company, data) {
        $scope.formData = {};
        $scope.alerts.push({
            type: 'success',
            msg: "<p>Welcome to " + $rootScope.company.name + ", " + newVolunteer.name + "! You are volunteer #" + newVolunteer.id + ".</p><p>Would you like to <a href=#>Sign In</a>?</p>"
        });
        $scope.go("/");
      });

  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

}
