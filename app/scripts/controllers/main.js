'use strict';

var conserje = angular.module('conserjeApp');

conserje.controller('MainCtrl', MainControllerBlock);

MainControllerBlock.$inject = ['$scope', '$resource', '$rootScope', '$location', 'Volunteer', 'Department'];
function MainControllerBlock($scope, $resource, $rootScope, $location, Volunteer, Department) {
  $rootScope.go = function(path) {
    $location.path(path);
  }
};
