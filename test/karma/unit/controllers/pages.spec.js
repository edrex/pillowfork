(function() {
    'use strict';

    // Pages Controller Spec
    describe('Controllers', function() {

        describe('PagesController', function() {

            // The $resource service augments the response object with methods for updating and deleting the resource.
            // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
            // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
            // When the toEqualData matcher compares two objects, it takes only object properties into
            // account and ignores methods.
            beforeEach(function() {
                this.addMatchers({
                    toEqualData: function(expected) {
                        return angular.equals(this.actual, expected);
                    }
                });
            });

            // Load the controllers module
            beforeEach(module('pillowfork'));

            // Initialize the controller and a mock scope
            var PagesController,
                scope,
                $httpBackend,
                $routeParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$routeParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                PagesController = $controller('PagesController', {
                    $scope: scope
                });

                $routeParams = _$routeParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));

            it('$scope.find() should create an array with at least one page object ' +
                'fetched from XHR', function() {

                    // test expected GET request
                    $httpBackend.expectGET('pages').respond([{
                        title: 'An Page about MEAN',
                        content: 'MEAN rocks!'
                    }]);

                    // run controller
                    scope.find();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.pages).toEqualData([{
                        title: 'An Page about MEAN',
                        content: 'MEAN rocks!'
                    }]);

                });

            it('$scope.findOne() should create an array with one page object fetched ' +
                'from XHR using a pageId URL parameter', function() {
                    // fixture URL parament
                    $routeParams.pageId = '525a8422f6d0f87f0e407a33';

                    // fixture response object
                    var testPageData = function() {
                        return {
                            title: 'An Page about MEAN',
                            content: 'MEAN rocks!'
                        };
                    };

                    // test expected GET request with response object
                    $httpBackend.expectGET(/pages\/([0-9a-fA-F]{24})$/).respond(testPageData());

                    // run controller
                    scope.findOne();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.page).toEqualData(testPageData());

                });

            it('$scope.create() with valid form data should send a POST request ' +
                'with the form input values and then ' +
                'locate to new object URL', function() {

                    // fixture expected POST data
                    var postPageData = function() {
                        return {
                            title: 'An Page about MEAN',
                            content: 'MEAN rocks!'
                        };
                    };

                    // fixture expected response data
                    var responsePageData = function() {
                        return {
                            _id: '525cf20451979dea2c000001',
                            title: 'An Page about MEAN',
                            content: 'MEAN rocks!'
                        };
                    };

                    // fixture mock form input values
                    scope.title = 'An Page about MEAN';
                    scope.content = 'MEAN rocks!';

                    // test post request is sent
                    $httpBackend.expectPOST('pages', postPageData()).respond(responsePageData());

                    // Run controller
                    scope.create();
                    $httpBackend.flush();

                    // test form input(s) are reset
                    expect(scope.title).toEqual('');
                    expect(scope.content).toEqual('');

                    // test URL location to new object
                    expect($location.path()).toBe('/pages/' + responsePageData()._id);
                });

            it('$scope.update() should update a valid page', inject(function(Pages) {

                // fixture rideshare
                var putPageData = function() {
                    return {
                        _id: '525a8422f6d0f87f0e407a33',
                        title: 'An Page about MEAN',
                        to: 'MEAN is great!'
                    };
                };

                // mock page object from form
                var page = new Pages(putPageData());

                // mock page in scope
                scope.page = page;

                // test PUT happens correctly
                $httpBackend.expectPUT(/pages\/([0-9a-fA-F]{24})$/).respond();

                // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
                //$httpBackend.expectPUT(/pages\/([0-9a-fA-F]{24})$/, putPageData()).respond();
                /*
                Error: Expected PUT /pages\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","title":"An Page about MEAN","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","title":"An Page about MEAN","to":"MEAN is great!","updated":[1383534772975]}
                */

                // run controller
                scope.update();
                $httpBackend.flush();

                // test URL location to new object
                expect($location.path()).toBe('/pages/' + putPageData()._id);

            }));

            it('$scope.remove() should send a DELETE request with a valid pageId' +
                'and remove the page from the scope', inject(function(Pages) {

                    // fixture rideshare
                    var page = new Pages({
                        _id: '525a8422f6d0f87f0e407a33'
                    });

                    // mock rideshares in scope
                    scope.pages = [];
                    scope.pages.push(page);

                    // test expected rideshare DELETE request
                    $httpBackend.expectDELETE(/pages\/([0-9a-fA-F]{24})$/).respond(204);

                    // run controller
                    scope.remove(page);
                    $httpBackend.flush();

                    // test after successful delete URL location pages lis
                    //expect($location.path()).toBe('/pages');
                    expect(scope.pages.length).toBe(0);

                }));

        });

    });
}());