let express = require('express');
let extend = require('lodash/extend');
let router = express.Router();

let Book = require('../models/Book.model');
let Author = require('../models/Author.model');

router.post('/books', (req,res) => {
    var { title, summary, isbn, authors } = req.body;
    if(authors.length === 0) {
        return res.send( { errors: { 1: "code 470"} , message: "at least one author is required" })
    }
    var book = new Book({ title, summary, isbn, authors }); 

    book.save((err, book) => {
        if(err) res.send(err);
            else {
            id = book._id;
            for(i=0;i<book.authors.length;i++) {
                Author.findByIdAndUpdate(book.authors[i], { $push: { books: id }}, (err) => {
                    if(err) res.send(err);
                }); 
            }
            res.json({ message: `Book with title ${title} successfully created!`});
        }
    });
});

router.get('/books', (req,res) => {
    Book.find().populate('authors').exec((err, books) => {
        if(err) res.send(err);
        res.send(books);
    });
});

router.get('/books/:book_id', (req,res) => {
    var { book_id } = req.params;
    Book.findById(book_id, (err, book) => {
        if(err) res.send(err);
        res.json(book);
    })
});

router.put('/books/:book_id', (req,res) => {
    var { book_id } = req.params;
    Book.findById(book_id, (err, book) => {
        if(err) res.send(err);

        book = extend(book, req.body); 

        book.save((err) => {
            if(err) res.send(err);

            res.json({ message: 'Book updated' });
        });
    });
});

router.delete('/books/:book_id', (req,res) => {
    var { book_id } = req.params;
    Book.remove({
        _id: book_id
    }, (err, book) => {
        if(err) res.send(err);
    });
    Author.updateMany({}, { $pull: { books: book_id }}, (err) => {
        if(err) res.send(err);

        res.json({ message: "Successfully deleted book" });
    });
});

module.exports = router;