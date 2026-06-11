require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const docRoutes = require("./routes/docRoutes");

const app = express();

// Middleware
app.use(cors());

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

// Test Route
app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend deployed successfully"
  });
});

// Home Route
app.get("/", (req, res) => {
  res.send("Docify Backend Running");
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/doc", docRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});