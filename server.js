require("dotenv").config();
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
    const Session = require("./models/Session");
    const newSession = new Session(req.body);
    await newSession.save();
    res.status(200).json({ message: "Session saved successfully" });
  } catch (error) {
    console.error("Error saving session:", error);
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
