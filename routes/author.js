let express = require('express');
let extend = require('lodash/extend');
let router = express.Router();

let Author = require('../models/Author.model');

router.post('/authors', (req,res) => {
    var { name, profilePicture, twitter } = req.body;
    var author = new Author({ name, profilePicture, twitter }); 

    author.save((err) => {
        if(err) res.send(err);
        res.json({ message: `Author successfully created!`});
    });
});

router.get('/authors', (req,res) => {
    Author.find((err, authors) => {
        if(err) res.send(err);
        res.send(authors);
    });
});

router.get('/authors/:author_id', (req,res) => {
    var { author_id } = req.params;
    Author.findById(author_id, (err, author) => {
        if(err) res.send(err);
        res.json(author);
    })
});

router.put('/authors/:author_id', (req,res) => {
    var { author_id } = req.params;
    Author.findById(author_id, (err, author) => {
        if(err) res.send(err);

        author = extend(author, req.body);

        author.save((err) => {
            if(err) res.send(err);

            res.json({ message: 'Author updated' });
        });
    });
});

router.delete('/authors/:author_id', (req,res) => {
    var { author_id } = req.params;
    Author.remove({
        _id: author_id
    }, (err, author) => {
        if(err) res.send(err);
        res.json({ message: 'Successfully deleted book' });
    });
});

module.exports = router;