angular.module('app.services', [])

  .constant('ddoc', 'pillowfork')
  .constant('db', 'pillowfork')

  .factory('dbUri', function($location, db) {
    var c = $location;
    return c.protocol() + '://' + c.host() + (c.port() ? ':'+ c.port() : '') + '/' + db;
  })
       
  .factory('remotePagesDb', function(dbUri) {
    return new PouchDB(dbUri, {ajax: {cache: false}});
  })

  .factory('pages', function(remotePagesDb, ddoc) {
    var db = remotePagesDb;
    
    // fully local copy of pages data for indexedDb browsers
    if (window.indexedDB) {
      var localDb = new PouchDB('pillowfork-pages');
      remotePagesDb.replicate.to(localDb, {continuous: true});
      db = localDb;
    }

    return {
      get: function(id) { return db.get(id)},
      sequels: function(id) { return db.query(ddoc+'/next-pages', { key: id || null })}
    }
  })

  .factory('draftsDb', function() {
    return new PouchDB('pillowfork-drafts');
  })

  .factory('notices', function($rootScope) {
    var msgs = [];

    $rootScope.$on('$routeChangeSuccess', function() {
      msgs.length = 0;
    });

    return {
      push: function(msg) {
        $rootScope.$apply(function(){
          msgs.push(msg);
        })
      },
      all: function() {
        return msgs;
      }
    }
  });

