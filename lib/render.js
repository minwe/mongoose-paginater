var _ = require('lodash');
var format = require('util').format;
var qs = require('querystring');

// Render pagination HTML

var renderDefauts = {
    firstText: 'First',
    prevText: '&laquo;',
    nextText: '&raquo;',
    lastText: 'Last',
    totalText: 'Page %d of %d , Total is %d',
    path: '',
    query: {},
    classNameSpace: '',
    className: {
        wrap: 'pagination',
        active: 'active',
        disable: 'disabled'
    }
};

var render = function(options) {
    options = _.merge({}, renderDefauts, options);

    var classPrefix = (options.classNameSpace) ? format('%s-', options.classNameSpace) : '';
    var wrapClass = classPrefix + options.className.wrap;
    var activeClass = classPrefix + options.className.active;
    var disableClass = classPrefix + options.className.disable;
    var prevDisable = (options.current === 1) ? format(' class="%s"', disableClass) : '';
    var nextDisable = (options.current === options.last) ? format(' class="%s"', disableClass) : '';
    var urlPrefix = format('%s?', options.path);

    var li = [];

    if (options.totalText) {
        li.push(format('<li><span>' + options.totalText + '</span></li>', options.current, options.last,options.count));
    }

    if (options.current > 1) {
        options.query['page'] = 1;
        li.push(format('<li><a href="%s%s">%s</a></li>', urlPrefix, qs.stringify(options.query), options.firstText));
    }

    options.query['page'] = options.prev;

    li.push(format('<li%s><a href="%s%s">%s</a></li>', prevDisable, urlPrefix, qs.stringify(options.query), options.prevText));

    _.forEach(options.pages, function(page) {
        options.query['page'] = page;
        var pageActiveClass = (page === options.current) ? format(' class="%s"', activeClass) : '';
        li.push(format('<li%s><a href="%s%s">%d</a></li>', pageActiveClass, urlPrefix, qs.stringify(options.query), page));
    });

    options.query['page'] = options.next;

    li.push(format('<li%s><a href="%s%s">%s</a></li>', nextDisable, urlPrefix, qs.stringify(options.query), options.nextText));

    if (options.current < options.last) {
        options.query['page'] = options.last;
        li.push(format('<li><a href="%s%s">%s</a></li>', urlPrefix, qs.stringify(options.query), options.lastText));
    }    options.query['page'] = options.last;

    return format('<ul class="%s">%s</ul>', wrapClass, li.join(''));
};

module.exports = render;
