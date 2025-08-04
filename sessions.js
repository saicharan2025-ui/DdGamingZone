const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  systemNumber: {
    type: String,
    required: true,
    enum: [
      enum: [
  'PC1', 'PC2', 'PC3', 'PC4', 'PC5', 'PC6',
  'CONSOLE1', 'CONSOLE2'
]

    ]
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Session', sessionSchema);
