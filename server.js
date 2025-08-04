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

// Routes
app.post("/api/save-session", async (req, res) => {
  try {
    const Session = require("./sessions.js");
    const newSession = new Session(req.body);
    await newSession.save();
    res.status(200).json({ message: "Session saved successfully" });
  } catch (error) {
    console.error("Error saving session:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

const Session = require("./sessions.js"); // Make sure this is required at the top

app.get("/api/today-sessions", async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const sessions = await Session.find({
      startTime: { $gte: startOfDay }
    });

    res.json(sessions);
  } catch (err) {
    console.error("Error fetching today's sessions:", err);
    res.status(500).json({ message: "Server error" });
  }
});

const Session = require("./models/Session"); // Ensure this line is at the top if not already

// Get sessions for today or past days
app.get("/api/get-sessions", async (req, res) => {
  try {
    const days = parseInt(req.query.days || "1");
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);

    const sessions = await Session.find({ createdAt: { $gte: fromDate } }).sort({ createdAt: -1 });
    res.json({ sessions });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


// Serve index.html on root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Gaming Zone server running at http://localhost:${PORT}`);
});
