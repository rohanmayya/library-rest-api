let express = require('express');
let router = express.Router();

let Book = require('../models/Book.model');

router.post('/books', (req,res) => {
    var { title, summary, isbn, author_id } = req.body;
    var book = new Book({ title, summary, isbn, author_id }); 

    book.save((err) => {
        if(err) res.send(err);
        res.json({ message: `Book with title ${title} successfully created!`});
    });
});

router.get('/books', (req,res) => {
    Book.find((err, books) => {
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

        book.name = req.body.name;

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
        res.json({ message: 'Successfully deleted book' });
    });
});

module.exports = router;