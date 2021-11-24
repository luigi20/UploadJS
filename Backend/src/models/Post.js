const mongoose = require('../database/connection');

const postSchema = new mongoose.Schema({
    name: String,
    key: String,
    size: Number,
    url: String,
    create_at: {
        type: Date,
        default: Date.now
    }
})

const post = new mongoose.model('Post', postSchema);

module.exports = post;