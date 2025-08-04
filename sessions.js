const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String },
  systemNumber: { type: String, required: true },
  isChild: { type: Boolean, default: false },
  duration: { type: Number }, // in minutes or hours (based on frontend)
  endTime: { type: String },  // optional, if needed
  amountPaid: { type: Number }, // optional
  startTime: { type: Date, default: Date.now } // set automatically
});

module.exports = mongoose.model("Session", sessionSchema);
