require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const docRoutes = require("./routes/docRoutes");

const app = express();

// Middleware
const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://dockster-collaborative-docs-editor.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log("MongoDB Error:", err);
});

// Home Route
app.get("/", (req, res) => {
    res.send("Docify Backend Running");
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/doc", docRoutes);

// Server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});