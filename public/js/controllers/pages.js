angular.module('pillowfork.pages').controller('PagesController', ['$scope', '$routeParams', '$location', 'Global', 'Pages', function ($scope, $routeParams, $location, Global, Pages) {
    $scope.global = Global;

    $scope.create = function() {
        var page = new Pages({
            title: this.title,
            content: this.content
        });
        page.$save(function(response) {
            $location.path("pages/" + response._id);
        });

        this.title = "";
        this.content = "";
    };

    $scope.remove = function(page) {
        if (page) {
            page.$remove();  

            for (var i in $scope.pages) {
                if ($scope.pages[i] == page) {
                    $scope.pages.splice(i, 1);
                }
            }
        }
        else {
            $scope.page.$remove();
            $location.path('pages');
        }
    };

    $scope.update = function() {
        var page = $scope.page;
        if (!page.updated) {
            page.updated = [];
        }
        page.updated.push(new Date().getTime());

        page.$update(function() {
            $location.path('pages/' + page._id);
        });
    };

    $scope.find = function() {
        Pages.query(function(pages) {
            $scope.pages = pages;
        });
    };

    $scope.findOne = function() {
        Pages.get({
            pageId: $routeParams.pageId
        }, function(page) {
            $scope.page = page;
        });
    };
}]);