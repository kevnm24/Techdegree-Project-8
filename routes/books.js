var express = require('express');
var router = express.Router();
const Book = require("../models").Book;

// Get books listing
router.get('/', function(req, res, next) {
  Book.findAll({order: [['title', 'ASC']]}).then(function(books) {
    res.render('index', {books: books})
  }).catch(function(err) {
    res.send(500)
  })
})

// add new book form
router.get('/new', function (req, res, next) {
  res.render('new-book', { book: Book.build()})
})

// POST create book
router.post('/', function(req, res, next) {
  Book.create(req.body).then(function(book) {
    res.redirect('/books');
  }).catch(function(err) {
    if(err.name === "SequelizeValidationError") {
      res.render('new-book', {
        book: Book.build(req.body),
        errors: err.errors
      })
    } else {
      throw err
    }
  }).catch(function(err) {
    res.send(500)
  })
})

// POST Update book
router.post('/:id', function(req, res, next) {
  Book.findById(req.params.id).then(function(book) {
    if(book) {
      return book.update(req.body)
    } else {
      res.send(404)
    }
  }).then(function(book) {
    res.redirect('/books')
  }).catch(function(err) {
    if(err.name === "SequelizeValidationError") {
      var book = Book.build(req.body)
      book.id = req.params.id
      res.render('update-book', {
        book: book,
        errors: err.errors
      })
    } else {
      throw err
    }
  }).catch(function(err) {
    res.send(500)
  })
})


// Delete individual article
router.post('/:id/delete', function(req, res, next) {
  Book.findById(req.params.id).then(function(book) {
    if(book) {
      return book.destroy()
    } else {
      res.send(404)
    }
  }).then(function() {
    res.redirect('/books')
  }).catch(function(err) {
    res.send(500)
  })
})

// Get individual book
router.get('/:id', function(req, res, next) {
  Book.findById(req.params.id).then(function(book) {
    if(book) {
      res.render('update-book', {book: book, title: book.title})
    } else {
      res.send(404)
    }
  }).catch(function(err) {
    res.send(500)
  })
})
module.exports = router;
