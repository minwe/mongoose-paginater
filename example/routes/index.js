var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');
var mongoosePaginater = require('mongoose-paginater');

mongoose.connect('mongodb://localhost/mongoose-paginater-exp');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log('Connected to DB');
});


var userSchema = mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    username: {type: String, require: true},
    email: {type: String, required: true, unique: true, lowercase: true}
});

var User = mongoose.model('User', userSchema);


/* GET home page. */
router.get('/', function(req, res) {
    User.count(function(err, count) {
        if (!count) {
            for(var i = 100; i >=0; i--) {
                new User({
                    id: i,
                    username: 'user' + i,
                    email: 'user' + i + '@domain.com'
                }).save();
            }
        }

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
    });
});

module.exports = router;
