// require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");

// Use the environment variables for MongoDB URI and server port
const mongoURI="mongodb+srv://stuart:ilovejesus@accounts.arnqo.mongodb.net/accounts"; // Use MongoDB URI from .env file
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
app.use(bodyParser.json());
app.use(cors());

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Create Account Route
app.post("/create-account", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send("All fields are required.");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).send("Account created successfully.");
  } catch (error) {
    res.status(500).send("Error creating account. Username or email may already exist.");
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required.");
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send("Invalid credentials.");
    }

    const passwordMatch = await bcrypt.compare(password, user.password); // Compare password
    if (!passwordMatch) {
      return res.status(401).send("Invalid credentials.");
    }

    res.status(200).send("Login successful.");
  } catch (error) {
    res.status(500).send("Error logging in.");
  }
});

// Start Server
const PORT = process.env.REACT_APP_DEV_SERVER_URL || 3001;  // Use PORT from .env file or default to 5001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
