'use strict';

angular.module('conserjeApp').controller('SignOutCtrl', SignOutController);

SignOutController.$inject = ['$scope', '$rootScope', '$resource', '$timeout', 'Volunteer', 'Department', 'config', '$modal'];
function SignOutController($scope, $rootScope, $resource, $timeout, Volunteer, Department, config, $modal) {
  var volunteers = Volunteer.query(function () {
      $scope.volunteers = volunteers;
  });

  var departments = Department.query(function () {
      $scope.departments = departments;
  });

  $scope.signOut = function (volunteerId) {
    $('.btn-sign-out#' + volunteerId).prop('disabled', true).text("Signing Out...");
    var SignOut = $resource('http://' + config.api.host + ':' + config.api.port + '/employees/sign_out');
    var newSignOut = new SignOut({'employeeId': volunteerId});
    newSignOut.$save(function(newSignOut, data) {
        var volunteers = Volunteer.query(function () {
          $scope.volunteers = volunteers;
        });
        var modalInstance = $modal.open({
          size       : 'lg',
          template   : "<div class='modal-header'><h1>Thank you for coming!</h1></div>" +
                       "<div class='modal-body'><h3>Total Hours : <span ng-if='hours > 0'>{{hours}} hrs</span> {{minutes}} min</h3>" +
                       "<!-- <h3>Today's Hours : <span ng-if='hours > 0'>{{hours}} hrs</span> {{minutes}} min</h3>--!></div>",
          controller : function($scope, $modalInstance, selectedId, timesheets) {
            $scope.selectedId = selectedId;
            var totalMin = 0;
            for (var i = 0; i < timesheets.timesheets.length; i++) {
              var attendance = timesheets.timesheets[i].total_attendance;
              totalMin += timesheets.timesheets[i].total_attendance;
            }
            $scope.hours = Math.floor(totalMin / 60);
            $scope.minutes = Math.ceil(totalMin % 60);
          },
          resolve    : {
            selectedId : function() {
              return volunteerId;
            },
            timesheets : function() {
              var Timesheet = $resource('http://' + config.api.host + ':' + config.api.port + '/employees/:volunteerId/attendance');
              return Timesheet.get({volunteerId:volunteerId}).$promise;
            }
          }
        });
        $timeout(function() {
          modalInstance.close();
          $rootScope.go("/");
        }, 5000);
    });
  };
}
