const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContentSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true
    },
    intro: {
        type: String,
        default: ''
    },
    excerpt: {
        type: String,
        default: ''
    },
    content: String,
    url: String,
    updated: Number,
    author: {
        name: String,
        avatar_url: String,
    },
    columnId: {
        type: String,
        ref: 'Column', // 指向专栏(你指向的数据库表名字)
    }
})

module.exports = mongoose.model('Content',ContentSchema)
