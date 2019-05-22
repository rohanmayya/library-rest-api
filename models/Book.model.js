let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var BookSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        max: 255 
    },
    summary: {
        type: String,
        required: true,
        min: [20, 'Too short']
    },
    isbn: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(v);
            },
            message: props => `${props.value} is not a valid ISBN`
        },
    },
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