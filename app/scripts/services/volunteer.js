'use strict';

angular.module('conserjeApp')
  .service('Volunteer', function Volunteer($resource, config) {
    console.log(config);
    return $resource('http://' + config.api.host + ':' + config.api.port + '/employees/:volunteerId', {});
  });
