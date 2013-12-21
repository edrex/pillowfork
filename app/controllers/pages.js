/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Page = mongoose.model('Page'),
    _ = require('underscore');


/**
 * Find page by id
 */
exports.page = function(req, res, next, id) {
    Page.load(id, function(err, page) {
        if (err) return next(err);
        if (!page) return next(new Error('Failed to load page ' + id));
        req.page = page;
        next();
    });
};

/**
 * Create a page
 */
exports.create = function(req, res) {
    var page = new Page(req.body);
    page.user = req.user;

    page.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                page: page
            });
        } else {
            res.jsonp(page);
        }
    });
};

/**
 * Update a page
 */
exports.update = function(req, res) {
    var page = req.page;

    page = _.extend(page, req.body);

    page.save(function(err) {
        res.jsonp(page);
    });
};

/**
 * Delete an page
 */
exports.destroy = function(req, res) {
    var page = req.page;

    page.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(page);
        }
    });
};

/**
 * Show a page
 */
exports.show = function(req, res) {
    res.jsonp(req.page);
};

/**
 * List of Pages
 */
exports.all = function(req, res) {
    Page.find().sort('-created').populate('user', 'name username').exec(function(err, pages) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(pages);
        }
    });
};
