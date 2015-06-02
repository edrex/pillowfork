var sha1 = require("crypto-js/sha1");

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

  .factory('pages', function($rootScope, remotePagesDb, ddoc) {
    var db = remotePagesDb;

    // fully local copy of pages data for indexedDb browsers
    if (window.indexedDB) {
      var localDb = new PouchDB('pillowfork-pages');
      remotePagesDb.replicate.to(localDb, {
        filter: ddoc+'/pages',
        continuous: true,
        onChange: function(change) {
          $rootScope.$broadcast('pagesChanged');
          console.log(change)
        }
      });
      db = localDb;
    }

    return {
      get: function(id) { return db.get(id)},
      sequels: function(id) { return db.query(function(doc) {
        if (doc.title && doc.body) {
          if (!doc.predecessors) {
            emit (null, doc)
          } else {
            doc.predecessors.forEach(function(p){
              emit(p, doc);
            });
          }
        }
      }, { key: id || null })},
      put: function(page) { return remotePagesDb.put(page) }
    }
  })

  .factory('drafts', function(pages, notices) {
    var db = new PouchDB('pillowfork-drafts');
    return {
      get: function(id) {
        id = id || "/";
        return db.get(id).then(null, function(e){
          // if doc doesn't exist, return an empty doc
          return {
            _id: id,
            title: '',
            body: ''
          }
        });
      },
      put: function(draft) {
        console.log("saved draft:", draft);
        return db.put(draft).then(function(r) {
          if (r.rev) draft._rev = r.rev;
        }
      )},
      publish: function(draft) {
        var page = {
          type: 'page',
          predecessors: [draft._id],
          title: draft.title,
          body: draft.body
        }
        if (draft._id == '/') delete page.predecessors;
        page._id = sha1(JSON.stringify(page)).toString();
        return pages.put(page).then(function(r){
          return db.remove(draft);
        }, function(e){
          notices.push({message: e.message, type: 'error'});
          throw e;
        });
      }
    }
    // return db;
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
  })

  .factory('sessionSvc', function($http, $rootScope){
    var verify = function(assertion) {
      if (assertion) {
        return $http.post('/_browserid', {
          'assertion': encodeURIComponent(assertion)
        }).success(function(data) {
          $rootScope.$broadcast('session:loaded', data);
        }).error(function(data, status, headers, config) {
          $rootScope.$broadcast('session:failed', data);
        })
      } else {
        $rootScope.$broadcast('session:failed', {msg: 'assertion missing'});
      }
    };

    var registerWatches = function(loggedInUser){
      navigator.id.watch({
        loggedInUser: loggedInUser,
        onlogin: function(assertion) {
          $rootScope.$broadcast('session:verifying', assertion);
          verify(assertion);
        },
        onlogout: function() {
          $http.delete('/_session').success(function(data){
            $rootScope.$broadcast('session:deleted', data);
          });
        }
      });
    };

    $http.get('/_session').success(function(data){
      $rootScope.$broadcast('session:loaded', data);
      registerWatches(data.userCtx.name);
    });

    return {
      signin: function() {return navigator.id.request()},
      signout: function() {return navigator.id.logout()}
    }
  });
