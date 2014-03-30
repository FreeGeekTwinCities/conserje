'use strict';

angular.module('conserjeApp')
  .service('Volunteer', function Volunteer($resource) {
      return $resource('http://localhost:3000/employees/:volunteerId', {});
  });
