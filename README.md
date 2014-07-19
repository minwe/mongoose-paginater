# Mongoose Paginater

A [Mongoose](https://github.com/LearnBoost/mongoose) paginatation plugin, forked from [Paginate for mongoose](https://github.com/song940/mongoose-paginate.git) by [song940](https://github.com/song940).

`paginater` means `paginator`.

## Installation

```
$ npm install mongoose-paginater
```

## Usage

```javascript
var mongoose = require('mongoose');
require('mongoose-paginater');

var options = {
  perPage: 10,
  delta  : 3,
  page   : req.query.page
};

var query = MyModel.find({deleted: false}).sort('name', 1);

query.paginater(options, function(err, res) {
  console.log(res); // => res = {
    //  results: [Document, ...],       // mongoose results
    //  current: 5,                     // current page number
    //  last: 12,                       // last page number
    //  prev: 4,                        // prev number or null
    //  next: 6,                        // next number or null
    //  pages: [ 2, 3, 4, 5, 6, 7, 8 ], // page numbers
    //  count: 125                      // document count
    //  render: '<ul>...</ul>'          // rendered pagination
  //};
});
```
    
## Pagination Render
    
There is a pagination template in the render, and you can set options via paginater's settings.
    
The defaults:
    
```javascript
{
    firstText: 'First',
    prevText: '&laquo;',
    nextText: '&raquo;',
    lastText: 'Last',
    totalText: 'Page %d of %d',
    path: '',  // path/to
    query: {}, // the page query is `page=n`, you can add other queries `{query1: 'val', q2: 'v2' }`
               // the pagination href will be like: `path/to?query1=val&q2=v2&page=n`
    classNameSpace: '',
    className: {
        wrap: 'pagination',
        active: 'active',
        disable: 'disabled'
    }
}
```
   
In the example folder, the render is used like this:
    
```javascript
var options = {
    perPage: 10,
    delta  : 3,
    page   : req.query.page,
    classNameSpace: 'am',
    query: {q1: 'v1', q2: 'v2'}
};

var query = User.find().sort({'id': 1});

query.paginater(options, function(err, result) {
    res.render('index', {
        title: 'User List',
        pager: result
    });
});
```
    
The HTML is for [Amaze UI Pagination](http://amazeui.org/css/pagination):
    
```html
<ul class="am-pagination">
  <li><span>Page 1 of 11</span></li>
  <li class="am-disabled"><a href="?q1=v1&q2=v2&page=1">« Prev</a></li>
  <li class="am-active"><a href="?q1=v1&q2=v2&page=1">1</a></li>
  <li><a href="?q1=v1&q2=v2&page=2">2</a></li>
  <li><a href="?q1=v1&q2=v2&page=3">3</a></li>
  <li><a href="?q1=v1&q2=v2&page=4">4</a></li>
  <li><a href="?q1=v1&q2=v2&page=5">5</a></li>
  <li><a href="?q1=v1&q2=v2&page=6">6</a></li>
  <li><a href="?q1=v1&q2=v2&page=7">7</a></li>
  <li><a href="?q1=v1&q2=v2&page=2">Next »</a></li>
  <li><a href="?q1=v1&q2=v2&page=11">Last</a></li>
</ul>
```

- [Bootstrap](http://getbootstrap.com/components/#pagination): just use it with default options.
- [UIKit](http://getuikit.com/docs/pagination.html): set `classNameSpace: 'uk'`

You can also use rendered HTML to other frameworks, just set classes you want.

## Run Example

1. Clone this project;
2. Install packages and run it;
3. Visit `localhost:3007`.

```
git clone https://github.com/Minwe/mongoose-paginater.git
cd mongoose-paginater/example
npm install
npm start
```



[![NPM](https://nodei.co/npm/mongoose-paginater.png?downloads=true&stars=true)](https://nodei.co/npm/mongoose-paginater/)

## License

The MIT License
