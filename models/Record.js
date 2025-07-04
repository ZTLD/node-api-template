const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  name: String,
  amount: Number,
});

module.exports = mongoose.model('Record', recordSchema);
