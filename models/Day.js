const mongoose = require('mongoose');

const DaySchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  total: {
    type: Number
  },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction'
    }
  ]
});

module.exports = mongoose.model('Day', DaySchema);
