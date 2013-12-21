(function() {
    'use strict';

    describe('Pillowfork controllers', function() {

        describe('IndexController', function() {

            // Load the controllers module
            beforeEach(module('pillowfork'));

            var scope,
                IndexController;

            beforeEach(inject(function($controller, $rootScope) {
                scope = $rootScope.$new();

                IndexController = $controller('IndexController', {
                    $scope: scope
                });
            }));

            it('should expose some global scope', function() {

                expect(scope.global).toBeTruthy();

            });

        });

    });

})();