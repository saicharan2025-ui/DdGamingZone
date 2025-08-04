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
      'pc1', 'pc2', 'pc3', 'pc4', 'pc5', 'pc6',
      'console1', 'console2'
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
