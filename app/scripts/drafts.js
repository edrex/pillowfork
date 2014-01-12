angular.module('app.drafts', ['ngRoute', 'app.pages'])

  .directive('contenteditable', function() {
    return {
      restrict: 'A', // only activate on element attribute
      require: '?ngModel', // get a hold of NgModelController
      link: function(scope, element, attrs, ngModel) {
        if(!ngModel) return; // do nothing if no ng-model
 
        // Specify how UI should be updated
        ngModel.$render = function() {
          element.html(ngModel.$viewValue || '');
        };
 
        // Listen for change events to enable binding
        element.on('blur keyup change', function() {
          scope.$apply(read);
        });
        read(); // initialize
 
        // Write data to the model
        function read() {
          var html = element.html();
          // When we clear the content editable the browser leaves a <br> behind
          // If strip-br attribute is provided then we strip this out
          if( attrs.stripBr && html == '<br>' ) {
            html = '';
          }
          ngModel.$setViewValue(html);
        }
      }
    };
  })

  .factory('draftsDb', function() {
    return new PouchDB('pillowfork-drafts');
  })

  .controller('DraftCtrl', function($scope, $location, $rootScope, $routeParams, draftsDb, pagesDb) {
    $scope.publish = function() {
      var d = $scope.doc;
      var page = {
        predecessor: d._id,
        title: d.title,
        body: d.body
      }
      if (d._id == '/') delete page.predecessor;
      page._id = hex_sha1(JSON.stringify(page));
      pagesDb.put(page, function(e,r){
        if (r && r.id) {
          draftsDb.remove($scope.doc);
          $location.path('/'+r.id);
          $location.replace();
          $rootScope.$digest()
        }
      });
    };
    $scope.doc = {
      _id: $routeParams.predecessorId || "/",
      title: '',
      body: ''
    };

    draftsDb.get($scope.doc._id, function(err, res){
      if (res) {
        _.assign($scope.doc,res);
        $scope.$digest()
      }
      $scope.$watch('doc', function(newValue, oldValue) {
        if (newValue.body !== oldValue.body || newValue.title !== oldValue.title) {
          draftsDb.put(newValue, {}, function(e, r) {
            if (r) $scope.doc._rev = r.rev;
          });
        }
      }, true);
    });
  });