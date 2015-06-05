'use strict';

angular.module('conserjeApp').service('Department', DepartmentService);

DepartmentService.$inject = ['$resource', 'config'];
function DepartmentService($resource, config) {
    return $resource('http://' + config.api.host + ':' + config.api.port + '/departments', {});
};
