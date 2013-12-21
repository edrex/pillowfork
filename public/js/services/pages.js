//Pages service used for pages REST endpoint
angular.module('mean.pages').factory("Pages", ['$resource', function($resource) {
    return $resource('pages/:pageId', {
        pageId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);