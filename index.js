/**
 * Mongoose Paginator
 */

var Query = require('mongoose').Query;
var render = require('./libs/render');

/**
 * paginator
 *
 * @param options
 * @param callback
 */

Query.prototype.paginator = function(options, callback) {
    var defaults = {
        perPage: 10, // Number of items to display on each page.
        delta: 5, // Number of page numbers to display before and after the current one.
        page: 1,  // Initial page number.
        params: {}
    };

    for (var key in options) {
        defaults[key] = options[key];
    }

    options = defaults;

    var delta = options.delta;
    var current = page = parseInt(options.page, 10) || 1;

    var query = this;
    var model = query.model;
    model.count(query._conditions, function(err, count) {
        var pagesCount = Math.ceil(count / options.perPage);

        // req page should lte total pages
        current = Math.min(current, pagesCount);

        var _skip = (current - 1) * options.perPage;
        query.skip(_skip).limit(options.perPage).exec(function(err, results) {
            if (err) {
                callback(err, {});
                return;
            }

            results = results || [];

            var start = Math.max(current - delta, 1);
            var end = Math.min(current + delta, pagesCount);

            var pagesReq = 2 * delta + 1;

            if (start === 1) {
                end = pagesReq;
            } else if (current < delta) {
                end = pagesReq - start;
            }

            end = Math.min(end, pagesCount);

            var pages = [];
            for (var i = start; i <= end; i++) {
                pages.push(i);
            }

            var prev = Math.max(current - 1, start);
            var next = Math.min(current + 1, end);

            console.log('end: %d, last: %d, prev: %d, next: %d', end, pagesCount, prev, next);

            var pager = {
                'results': results,
                'options': options,
                'current': current,
                'last': pagesCount,
                'prev': prev,
                'next': next,
                'pages': pages,
                'count': count
            };

            pager['render'] = render(options);

            callback(err, pager);
        });
    });
};
