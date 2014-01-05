angular.module('app.pages', ['ngRoute'])

  .factory('config', function($location) {
      c = {
        protocol: $location.protocol(),
        host: $location.host(),
        port: $location.port(),
        db: 'pillowfork',
        ddoc: 'pillowfork'
      }
      c.uri = c.protocol + '://' + c.host + (c.port ? ':'+ c.port : '') + '/' + c.db;
      return c;
  })

  .factory('pagesdb', function(pouchdb, config) {
       
      // PouchDB.replicate(config.uri, local, {continuous: true });
      // pouchdb.replicate(local, config.uri, {continuous: true });
      // return pouchdb.create('pages');
      db = pouchdb.create(config.uri)
      // db = new PouchDB(config.uri)
      return db;
  })

  .factory('pages', function($q, pagesdb, config) {

      return {
          add: function(page) { 
            // TODO: set ID here
            pagesdb.put(page);
          },
          nextPages: function(predecessor) {
            return pagesdb.query(config.ddoc+'/next-pages', { key: predecessor || null }).then(function(res){
              return _.pluck(res.rows, 'value');
            });
          }
      };
  })

  .controller('PageCtrl', function($scope, $routeParams, pages) {
    // is there a better way to do this?
    // $scope.location = $location;
    // $scope.$watch('location.path()', function(path) {
    //   $scope.pageId = path;
    // });
    $scope.pageId = $routeParams.pageId;
    // $scope.page = pagesdb.find()
  
    // need to wrap couch queries in services which handle change watching
    pages.nextPages().then(function(val){
      $scope.nextPages = val
    });
  })


