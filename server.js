// server.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Define schema
const SessionSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  address: String,
  systemNumber: String,
  isChild: Boolean,
  startTime: Date,
  durationMinutes: Number,
  sessionType: String, // PC or PS
  amount: Number
});

const Session = mongoose.model("Session", SessionSchema);

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Serve static files (HTML/CSS/JS)

// API to save session
app.post('/api/saveSession', async (req, res) => {
  try {
    const session = new Session(req.body);
    await session.save();
    res.status(201).json({ success: true, message: "Session saved!" });
  } catch (err) {
    console.error("Error saving session:", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Serve frontend fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
