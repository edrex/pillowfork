angular.module('app.pages', ['ngRoute'])
  .constant('ddoc', 'pillowfork')
  .constant('db', 'pillowfork')

  .factory('dbUri', function($location, db) {
    var c = $location;
    return c.protocol() + '://' + c.host() + (c.port() ? ':'+ c.port() : '') + '/' + db;
  })
       
  .factory('remotePagesDb', function(dbUri) {
    return new PouchDB(dbUri, {ajax: {cache: false}});
  })

  .factory('pagesDb', function(remotePagesDb) {
    localDb = new PouchDB('pillowfork-pages');
    remotePagesDb.replicate.to(localDb, {continuous: true});
    return localDb;
  })

  .controller('PageCtrl', function($scope, $routeParams, pagesDb, ddoc) {
    $scope.pageId = $routeParams.pageId;

    if ($scope.pageId) {
      pagesDb.get($scope.pageId,function(err, res){
        $scope.page = res;
      });
    } else {
      $scope.page = undefined;
    }
 
    pagesDb.query(ddoc+'/next-pages', { key: $scope.pageId || null }, function(err, res){
      $scope.nextPages = _.pluck(res.rows, 'value');
      $scope.$digest()
    });
  });