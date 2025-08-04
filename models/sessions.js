// /models/Session.js

const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  playerName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  systemNumber: { type: String, required: true },
  isChild: { type: Boolean, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  paymentAmount: { type: Number, required: true },
  systemType: { type: String, enum: ["PC", "PS4"], required: true },
  manuallyClosed: { type: Boolean, default: false },
  parentAlertSent: { type: Boolean, default: false },
  parentApproved: { type: Boolean, default: false },
});

module.exports = mongoose.model("Session", sessionSchema);
