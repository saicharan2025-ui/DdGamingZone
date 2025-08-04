require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

const sessionSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  address: String,
  system: String,
  isChild: Boolean,
  duration: Number,
  startTime: { type: Date, default: Date.now }
});

const Session = mongoose.model('Session', sessionSchema);

app.post('/api/start-session', async (req, res) => {
  const newSession = new Session(req.body);
  await newSession.save();
  res.json({ message: 'Session started', session: newSession });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));