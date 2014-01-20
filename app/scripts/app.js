angular.module('pillowfork', ['ngRoute', 'app.services', 'app.directives'])

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
  })

  .controller('NoticesCtrl', function($scope, notices) {
    $scope.notices = notices;
  })

  .controller('PageCtrl', function($scope, $routeParams, pages, drafts) {
    $scope.pageId = $routeParams.pageId;

    if ($scope.pageId) {
      pages.get($scope.pageId).then(function(res){
        $scope.page = res;
      }, function(err){
        // DO SOMETHING HERE
      });
    } else {
      // What does this do?
      $scope.page = undefined;
    }
 
    pages.sequels($scope.pageId).then(function(res){
      $scope.nextPages = _.pluck(res.rows, 'value');
    drafts.get($routeParams.pageId).then(function(r){
      $scope.draft = r;
      $scope.$digest()
    });
  })

  .controller('DraftCtrl', function($scope, $location, $rootScope, $routeParams, drafts) {

    drafts.get($routeParams.pageId).then(function(res){
      $scope.draft = res;
      $scope.$digest()
      $scope.$watch('[draft.title, draft.body]', function(n, o) {
        drafts.put($scope.draft)
      }, true);
    });
    $scope.publish = function() {
      drafts.publish($scope.draft).then(function(r){
        // sending to parent currently, to sidestep async prob.
        // TODO: wait for sync before redirect, via change listener
        $location.path('/'+($routeParams.pageId || ''));
        $location.replace();
        $rootScope.$apply();
      });
    };
  });