const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const path = require('path');

const CommentSchema = new Schema({
    publication: {type: Schema.ObjectId, ref: 'Publication'},
    email: String,
    gravatar: String,
    comment: String,
    file: String,
    created_at: String,
    //created_at: { type: Date, default: Date.now },
    //reactions
    likes: { type: Number, default: 0 },
        
});

module.exports = mongoose.model('Comment', CommentSchema);