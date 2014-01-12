angular.module('app.pages', ['ngRoute', 'pouchdb'])
  .constant('ddoc', 'pillowfork')
  .constant('db', 'pillowfork')

  .factory('pagesDb', function(pouchdb, $location, db) {
    var c = $location;
    var dbUri = c.protocol() + '://' + c.host() + (c.port() ? ':'+ c.port() : '') + '/' + db;
       
    // PouchDB.replicate(config.uri, local, {continuous: true });
    // pouchdb.replicate(local, config.uri, {continuous: true });
    // return pouchdb.create('pages');
    // db = pouchdb.create(dbUri);
    db = new PouchDB(dbUri)
    return db;
  })

  .controller('PageCtrl', function($scope, $routeParams, pagesDb, ddoc) {
    var pageId = $routeParams.pageId;

    if (pageId) {
      pagesDb.get(pageId,function(err, res){
        $scope.page = res;
      });
    } else {
      $scope.page = undefined;
    }
 
    pagesDb.query(ddoc+'/next-pages', { key: pageId || null }, function(err, res){
      $scope.nextPages = _.pluck(res.rows, 'value');
      $scope.$digest()
    });
  });