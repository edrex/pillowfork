angular.module('pillowfork', ['pouchdb'])

// .config(function($routeProvider, $locationProvider) {
//   $routeProvider.when('/:pageId', {});

//   // configure html5 to get links working on jsfiddle
//   // $locationProvider.html5Mode(true);
// })

// To have a database as a dependency that you can inject in a service
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
});


function PagesController($scope, pages, $location) {
  // is there a better way to do this?
  $scope.location = $location;
  $scope.$watch('location.path()', function(path) {
    $scope.pageId = path;
  });

  // $scope.page = pagesdb.find()
  
  // need to wrap couch queries in services which handle change watching
  pages.nextPages().then(function(val){
    $scope.nextPages = val
  });
}
