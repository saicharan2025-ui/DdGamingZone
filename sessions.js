const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: String,
  address: String,
  systemNumber: { type: String, required: true },
  isChild: Boolean,
  duration: Number, // in minutes
  startTime: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }, // NEW
  endTime: { type: Date }, // Optional, when session ends
}, { timestamps: true });

module.exports = mongoose.model("Session", sessionSchema);
