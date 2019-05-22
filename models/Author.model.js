let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// sample avatar
// https://api.adorable.io/avatars/285/abott@adorable.png

var AuthorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    profilePicture: Buffer,
    twitter: {
        type: String,
        required: true
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }],
    created: { 
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Author', AuthorSchema);