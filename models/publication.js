const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const PublicationSchema = new Schema({
    text: String,
    file: String,
    //created_at: String,
    created_at: { type: Date, default: Date.now },
    user: String,
    //user: {type: Schema.ObjectId, ref: 'User'},
    //reactions
    likes: { type: Number, default: 0 },
    loves: { type: Number, default: 0 },
    views: { type: Number, default: 0 }
});

module.exports = mongoose.model('Publication', PublicationSchema);