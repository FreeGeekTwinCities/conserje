'use strict';

angular.module('conserjeApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'ui.select2',
  'ui.mask',
  'ui.validate',
  'ngGrid',
  'webcam'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/volunteers', {
        templateUrl: 'views/volunteer-list.html',
        controller: 'VolunteerListCtrl'
      })
      .when('/volunteer/new', {
        templateUrl: 'views/new-volunteer.html',
        controller: 'NewVolunteerCtrl'
      })
      .when('/volunteer/:volunteerId', {
        templateUrl: 'views/volunteer-timesheets.html',
        controller: 'VolunteerTimesheetsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope, $resource) {
    var Company = $resource('http://localhost:3000/companies');
    
    var companies = Company.query(function () {
        $rootScope.company = companies[0];
    });
  });
