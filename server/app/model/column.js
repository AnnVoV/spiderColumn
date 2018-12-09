const mongoose = require('mongoose');

const ColumnSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    title: String,
    intro: String,
    author: {
        name: String,
        avatar_url: String,
    },
    image_url: String,
})

module.exports = mongoose.model('Column',ColumnSchema)
