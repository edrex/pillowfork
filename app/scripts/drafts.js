angular.module('app.drafts', ['ngRoute', 'pouchdb'])

  .controller('DraftCtrl', function($scope, $routeParams) {
    $scope.init = function() {
      new Medium({
        element: document.getElementById('draftTitle'),
        mode: 'inline',
        maxLength: 150,
        placeholder: 'Page Title'
      });
      new Medium({
        element: document.getElementById('draftBody'),
        mode: 'rich',
        placeholder: 'Page Body'
      });
    };
    $scope.previousPageId = $routeParams.previousPageId;

  });