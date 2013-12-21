/**
 * Module dependencies.
 */
var should = require('should'),
    app = require('../../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Page = mongoose.model('Page');

//Globals
var user;
var page;

//The tests
describe('<Unit Test>', function() {
    describe('Model Page:', function() {
        beforeEach(function(done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function(err) {
                page = new Page({
                    title: 'Page Title',
                    content: 'Page Content',
                    user: user
                });

                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return page.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should show an error when try to save without title', function(done) {
                page.title = '';

                return page.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should show an error when try to save without content', function(done) {
                page.content = '';

                return page.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            Page.remove({});
            User.remove({});
            done();
        });
        after(function(done) {
            Page.remove().exec();
            User.remove().exec();
            done();
        });
    });
});