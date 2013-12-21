//Pages service used for pages REST endpoint
angular.module('pillowfork.pages').factory("Pages", ['$resource', function($resource) {
    return $resource('pages/:pageId', {
        pageId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);