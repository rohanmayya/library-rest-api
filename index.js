const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = express.Router();

const app = express();

// routes
let authorRoute = require('./routes/author');
let bookRoute = require('./routes/book');

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req,res,next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`);
    next();
});

router.use(bookRoute);
router.use(authorRoute);

mongoose.connect('mongodb://localhost:27017/mitter-db', {useNewUrlParser: true})
        .then(res => console.log("Connected to MongoDB!"))
        .catch(err => console.log("Could not connect to MongoDB"));


const port = 3000;

app.use('/api/v1', router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));