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

  .controller('DraftCtrl', function($scope, $location, $rootScope, $routeParams, draftsDb, remotePagesDb) {
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
          draftsDb.put(newValue, {}, function(e, r) {
            if (r) $scope.draft._rev = r.rev;
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
      console.log(JSON.stringify(page));
      page._id = CryptoJS.SHA1(JSON.stringify(page)).toString();
      remotePagesDb.put(page, function(e,r){
        if (r && r.id) {
          draftsDb.remove($scope.draft);
          // sending to parent currently, to sidestep async prob.
          // TODO: wait for sync before redirect, via change listener
          $location.path('/'+($routeParams.pageId || ''));
          $location.replace();
          $rootScope.$digest();
        }
      });
    };
  });