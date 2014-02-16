'use strict';

angular.module('conserjeApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'ui.select2'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/volunteer-list', {
        templateUrl: 'views/volunteer-list.html',
        controller: 'VolunteerListCtrl'
      })
      .when('/volunteer-timesheets', {
        templateUrl: 'views/volunteer-timesheets.html',
        controller: 'VolunteerTimesheetsCtrl'
      })
      .when('/new-volunteer', {
        templateUrl: 'views/new-volunteer.html',
        controller: 'NewVolunteerCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
