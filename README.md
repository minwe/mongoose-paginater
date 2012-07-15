# Paginate for Mongoose Paginator

A [Mongoose](https://github.com/LearnBoost/mongoose) paginate plugin, forked from [Paginate for mongoose](https://github.com/song940/mongoose-paginate.git) by [song940](https://github.com/song940)

[![NPM](https://nodei.co/npm/paginate-for-mongoose.png?downloads=true&stars=true)](https://nodei.co/npm/paginate-for-mongoose/)

## Installation

    $ npm install paginate-for-mongoose

## Example

    require('paginate-for-mongoose');
    var options = {
      perPage: 10,
      delta  : 3,
      page   : req.query.page
    };
    var query = MyModel.find({deleted: false}).sort('name', 1);
    query.paginate(options, function(err, res) {
      console.log(res); // => res = {
        //  options: options,               // paginate options
        //  results: [Document, ...],       // mongoose results
        //  current: 5,                     // current page number
        //  last: 12,                       // last page number
        //  prev: 4,                        // prev number or null
        //  next: 6,                        // next number or null
        //  pages: [ 2, 3, 4, 5, 6, 7, 8 ], // page numbers
        //  count: 125                      // document count
      //};
    });

## License

The MIT License
