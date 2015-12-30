var _ = require('lodash');
var Query = require('mongoose').Query;
var render = require('./lib/render');


// Mongoose Paginater
//
// @param options
// @param callback

Query.prototype.paginater = function(options, callback) {
    var defaults = {
        perPage: 10, // Number of each page.
        delta: 5,    // Number of page numbers to display before and after the current one.
        page: 1      // Initial page number.
    };

    options = _.merge({}, defaults, options);

    var delta = options.delta;
    var current = parseInt(options.page, 10) || 1;

    var query = this;
    var model = query.model;
    model.count(query._conditions, function(err, count) {
        var pageCount = Math.ceil(count / options.perPage);

        // req page should lte total pages
        current = Math.min(current, pageCount);

        var _skip = Math.max(0,(current - 1) * options.perPage);
        query.skip(_skip).limit(options.perPage).exec(function(err, results) {
            if (err) {
                callback(err, {});
                return;
            }

            results = results || [];

            var start = Math.max(current - delta, 1);
            var end = Math.min(current + delta, pageCount);

            var pagesReq = 2 * delta + 1;

            if (start === 1) {
                end = pagesReq;
            } else if (current < delta) {
                end = pagesReq - start;
            }

            end = Math.min(end, pageCount);

            if (pageCount - current < delta) {
                start = Math.max(start - (delta - (pageCount - current)), 1);
            }

            var pages = [];
            for (var i = start; i <= end; i++) {
                pages.push(i);
            }

            var prev = Math.max(current - 1, start);
            var next = Math.min(current + 1, end);

            // console.log('current: %d, start: %d, end: %d, total: %d, prev: %d, next: %d', current, start, end, pageCount, prev, next);

            var pager = {
                'results': results,
                'current': current,
                'last': pageCount,
                'prev': prev,
                'next': next,
                'pages': pages,
                'count': count
            };

            pager.render = render(_.merge({}, pager, options));

            callback(err, pager);
        });
    });
};
