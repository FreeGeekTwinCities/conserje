'use strict';

angular.module('conserjeApp')
  .controller('MainCtrl', function ($scope, $resource, $rootScope) {
    var Volunteer = $resource('http://localhost:3000/employees/:volunteerId');
    
    var volunteers = Volunteer.query(function () {
        $scope.volunteers = volunteers;
    });
    
    var Department = $resource('http://localhost:3000/departments');
    
    var departments = Department.query(function () {
        $scope.departments = departments;
    });
    
    $scope.processForm = function () {
      var SignIn = $resource('http://localhost:3000/employees/sign_in');
      var newSignIn = new SignIn($scope.formData);
      newSignIn.$save(function(newSignIn, data) {
          $scope.formData = {};
          var volunteers = Volunteer.query(function () {
            $scope.volunteers = volunteers;
          });
    
      });
    };
    
    $scope.signOut = function (volunteerId) {
      console.log(volunteerId);
      var SignOut = $resource('http://localhost:3000/employees/sign_out');
      var newSignOut = new SignOut({'employeeId': volunteerId});
      newSignOut.$save(function(newSignOut, data) {
          console.log(data);
          var volunteers = Volunteer.query(function () {
            $scope.volunteers = volunteers;
          });
    
      });
    };
    
  });
