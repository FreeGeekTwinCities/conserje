'use strict';

angular.module('conserjeApp').controller('SignInCtrl', SignInController);

SignInController.$inject = ['$scope', '$rootScope', '$resource', '$timeout', '$modal', 'Volunteer', 'Department', 'config'];
function SignInController($scope, $rootScope, $resource, $timeout, $modal, Volunteer, Department, config) {
  var volunteers = Volunteer.query(function () {
      $scope.volunteers = volunteers;
  });

  var departments = Department.query(function () {
      $scope.departments = departments;
  });

  $scope.processForm = function () {
    if ($scope.formData.employeeId && $scope.formData.departmentId &&
        $scope.formData.employeeId.length > 0 && $scope.formData.departmentId.length > 0) {
          var SignIn = $resource('http://' + config.api.host + ':' + config.api.port + '/employees/sign_in');
          var newSignIn = new SignIn($scope.formData);
          newSignIn.$save(function(newSignIn, data) {
              $scope.formData = {};
              var volunteers = Volunteer.query(function () {
                $scope.volunteers = volunteers;
              });
              var modalInstance = $modal.open({
                size       : 'lg',
                template   : "<div class='modal-header'><h1>You're In!</h1></div>" +
                             "<div class='modal-body'>Time to <h2>Geek Out</h2></div>",
                controller : ['$scope', '$modalInstance', function($scope, $modalInstance) {}],
              });

              $timeout(function() {
                modalInstance.close();
                $rootScope.go("/")
              }, 2500);
          });
        } else {
          var modalInstance = $modal.open({
            size       : 'lg',
            template   : "<div class='modal-header'>Not Signed in!</div>" +
                         "<div class='modal-body'><h1>Choose your name and task to sign in!</h1></div>",
            controller : ['$scope', '$modalInstance', function($scope, $modalInstance) {}],
          });
        }
  };
}
