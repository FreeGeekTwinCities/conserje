'use strict';

var conserje = angular.module('conserjeApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'ui.select2',
  'ui.mask',
  'ui.validate',
  'ngGrid'
]);

conserje.config(ConfigBlock);
conserje.run(RunBlock);

RunBlock.$inject = ['$rootScope', '$resource'];
function RunBlock($rootScope, $resource) {
  var Company = $resource('http://localhost:3000/companies');

  var companies = Company.query(function () {
      $rootScope.company = companies[0];
  });
}

ConfigBlock.$inject = ['$routeProvider'];
function ConfigBlock($routeProvider) {

  var MainState = {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  };
  var VolunteerState = {
    templateUrl: 'views/volunteer-list.html',
    controller: 'VolunteerListCtrl'
  };
  var SignInState = {
    templateUrl: 'views/signin.html',
    controller: 'SignInCtrl'
  };
  var SignOutState = {
    templateUrl: 'views/signout.html',
    controller: 'SignOutCtrl'
  };
  var NewVolunteerState = {
    templateUrl: 'views/new-volunteer.html',
    controller: 'NewVolunteerCtrl'
  };
  var ViewVolunteerState = {
    templateUrl: 'views/volunteer-timesheets.html',
    controller: 'VolunteerTimesheetsCtrl'
  };

  $routeProvider.when('/', MainState);
  $routeProvider.when('/signin', SignInState);
  $routeProvider.when('/signout', SignOutState);
  $routeProvider.when('/volunteer', VolunteerState)
  $routeProvider.when('/volunteer/new', NewVolunteerState);
  $routeProvider.when('/volunteer/:volunteerId', ViewVolunteerState);
  $routeProvider.otherwise({
    redirectTo: '/'
  });
}
