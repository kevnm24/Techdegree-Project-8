var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');
const Book = require('../models').Book;

// add new book form
router.get('/books/new', function (req, res, next) {
  res.render('new-book')
})

// // POST create book
// router.post('/', function(req, res, next) {
//   Book.create(req.body).then(function(book) {
//     res.redirect('/books/' + book.id);
//   })
// })
