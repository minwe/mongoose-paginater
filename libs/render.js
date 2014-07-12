var qs = require('querystring');

var render = function(options){
    var li = [];
    options.params['page'] = 1;
    li.push('<li><a href="?'+ qs.stringify(options.params) +'" >First</a></li>');
    options.params['page'] = options.prev;
    li.push('<li><a href="?'+ qs.stringify(options.params) +'" >Prev</a></li>');
    for(var index in options.pages){
        var page = options.pages[index];
        options.params['page'] = page;
        li.push('<li><a href="?'+ qs.stringify(options.params) +'" >'+ page +'</a></li>');
    }
    options.params['page'] = options.next;
    li.push('<li><a href="?'+ qs.stringify(options.params) +'" >Next</a></li>');
    options.params['page'] = options.last;
    li.push('<li><a href="?'+ qs.stringify(options.params) +'" >Last</a></li>');
    return '<ul>'+ li.join('') +'</ul>';
};

module.exports = function(options){
    return function(){
        return render(options);
    };
};
