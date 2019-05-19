let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var BookSchema = new Schema({
    title: String,
    summary: String,
    isbn: String,
    authors: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Author'
    }],
    created: { 
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Book', BookSchema);