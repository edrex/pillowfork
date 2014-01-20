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

  .controller('PageCtrl', function($scope, $routeParams, pages) {
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
      $scope.$digest()
    }, function(err){
      // DO SOMETHING HERE
    });
  })

  .controller('DraftCtrl', function($scope, $location, $rootScope, $routeParams, notices, draftsDb, remotePagesDb) {
    $scope.draft = {
      // note that the draft ID is the ID of the predecessor page
      _id: $routeParams.pageId || "/",
      title: '',
      body: ''
    };

    draftsDb.get($scope.draft._id, function(err, res){
      if (res) {
        _.assign($scope.draft,res);
        $scope.$digest()
      }
      $scope.$watch('draft', function(newValue, oldValue) {
        if (newValue.body !== oldValue.body || newValue.title !== oldValue.title) {
          draftsDb.put(newValue, {}).then(function(r) {
            if (r.rev) $scope.draft._rev = r.rev;
          },function(e) {
            // DO SOMETHING HERE
          });
        }
      }, true);
    });
    $scope.publish = function() {
      var page = {
        predecessors: [$scope.draft._id],
        title: $scope.draft.title,
        body: $scope.draft.body
      }
      if ($scope.draft._id == '/') delete page.predecessors;
      page._id = CryptoJS.SHA1(JSON.stringify(page)).toString();
      remotePagesDb.put(page).then(function(r){
        if (r.id) {
          draftsDb.remove($scope.draft);
          // sending to parent currently, to sidestep async prob.
          // TODO: wait for sync before redirect, via change listener
          $location.path('/'+($routeParams.pageId || ''));
          $location.replace();
          $rootScope.$digest();
        }
      }, function(e){
        notices.push({message: e.message, type: 'error'});
        // DO SOMETHING HERE
      });
    };
  });