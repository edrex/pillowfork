angular.module('pillowfork', ['ngRoute', 'pouchdb', 'app.pages'])

  .constant('TPL_PATH', '/templates')

  .config(function($routeProvider, TPL_PATH) {
    $routeProvider.when('/:pageId?', {
      controller : 'PageCtrl',
      templateUrl : TPL_PATH + '/page.html'
    });
  });
