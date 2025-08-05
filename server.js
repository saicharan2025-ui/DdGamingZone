require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("MongoDB connected successfully"));

// Import model
const Session = require("./sessions.js");

// Save a new session
app.post('/api/start-session', async (req, res) => {
  try {
    const sessionData = {
      name: req.body.name,
      mobile: req.body.mobile,
      address: req.body.address,
      systemNumber: req.body.systemNumber,
      isChild: req.body.isChild,
      allocatedMinutes: req.body.allocatedMinutes,
      isActive: true,
      startTime: new Date()
    };

    const session = new Session(sessionData);
    await session.save();

    res.status(201).json(session);
  } catch (error) {
    console.error('Error saving session:', error);
    res.status(500).json({ error: 'Failed to save session' });
  }
});

// Get today's sessions
app.get("/api/today-sessions", async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const sessions = await Session.find({ startTime: { $gte: startOfDay } });
    res.json(sessions);
  } catch (err) {
    console.error("Error fetching today's sessions:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get sessions for past X days (default: 1)
app.get("/api/get-sessions", async (req, res) => {
  try {
    const days = parseInt(req.query.days || "1");
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);

    const sessions = await Session.find({ createdAt: { $gte: fromDate } }).sort({ createdAt: -1 });
    res.json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get active sessions
app.get("/api/active-sessions", async (req, res) => {
  try {
    const activeSessions = await Session.find({ isActive: true });
    res.json(activeSessions);
  } catch (err) {
    console.error("Error fetching active sessions:", err);
    res.status(500).json({ error: "Failed to fetch active sessions" });
  }
});

// End a session (style 2 - sessionId in URL)
app.post('/api/end-session/:id', async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ error: 'Session not found' });

    const now = new Date();
    const start = new Date(session.startTime);
    const usedMinutes = Math.ceil((now - start) / (1000 * 60));

    session.endTime = now;
    session.isActive = false;
    session.usedMinutes = usedMinutes;

    await session.save();

    res.json({ message: 'Session ended', session });
  } catch (err) {
    console.error('Error ending session:', err);
    res.status(500).json({ error: 'Error ending session' });
  }
});

// Serve index.html on root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Gaming Zone server running at http://localhost:${PORT}`);
});
