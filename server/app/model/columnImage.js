const mongoose = require('mongoose');

const ColumnImageSchema = new mongoose.Schema({
  key: {
    type: String,
    unique: true,
  },
  value: String,
})

module.exports = mongoose.model('ColumnImage', ColumnImageSchema)
