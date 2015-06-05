'use strict';

angular.module('conserjeApp').service('Volunteer', VolunteerService);

VolunteerService.$inject = ['$resource', 'config'];
function VolunteerService($resource, config) {
    return $resource('http://' + config.api.host + ':' + config.api.port + '/employees/:volunteerId', {}, { 'get': {method:'GET', isArray: true}});
};
