var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./config/db')
var mongoose = require('mongoose')
var app = express();
var cors = require('cors');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(db.staging || db.url, {
    useNewUrlParser: true
}).then(function(docs) {
    console.log(db.url + ' connected')
}).catch(function() {
    console.log(err)
})

// Models
require('./models/users')
require('./models/history')

// Routers
app.use(require('./routes'))


module.exports = app;
