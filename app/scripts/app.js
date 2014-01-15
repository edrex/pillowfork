angular.module('pillowfork', ['ngRoute', 'app.pages', 'app.drafts'])

  .constant('TPL_PATH', '/templates')

  .config(function($routeProvider, TPL_PATH) {
    $routeProvider.when('/draft/:pageId?', {
      controller : 'DraftCtrl',
      templateUrl : TPL_PATH + '/draft.html'
    });
    $routeProvider.when('/:pageId?', {
      controller : 'PageCtrl',
      templateUrl : TPL_PATH + '/page.html'
    });
  });
