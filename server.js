const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mongoose Schema and Model (defined inline)
const sessionSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  address: String,
  systemNumber: Number,
  isChild: Boolean,
  startTime: Date,
  endTime: Date,
  platform: String,
  paymentAmount: Number,
  parentAlertSent: Boolean,
});
const Session = mongoose.model('Session', sessionSchema);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// POST Route to Save Session Data
app.post('/api/sessions', async (req, res) => {
  try {
    const newSession = new Session(req.body);
    await newSession.save();
    res.status(201).json({ message: 'Session saved successfully!' });
  } catch (error) {
    console.error('❌ Error saving session:', error);
    res.status(500).json({ message: 'Failed to save session' });
  }
});

// Health Check Route
app.get('/', (req, res) => {
  res.send('🎮 Gaming Zone Backend is Live');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
