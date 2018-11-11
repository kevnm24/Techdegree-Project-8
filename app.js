var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var connect = require('connect')

var routes = require('./routes/index');
var books = require('./routes/books');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes)
app.use('/books', books)

// catch 404 and forward to error handler
app.use(function(req, res) {
  res.status(400);
  res.render('page-not-found');
});

// catch 500 error
app.use(function(error, req, res, next) {
  res.status(500);
  res.render('error');
});

module.exports = app;
