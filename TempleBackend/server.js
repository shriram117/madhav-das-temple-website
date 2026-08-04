require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const eventRoutes = require("./routes/eventRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static Folder for Uploaded Images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);
// Test PostgreSQL Connection
pool.connect()
    .then(() => {
        console.log("✅ PostgreSQL Connected Successfully");
    })
    .catch((err) => {
        console.log("❌ Database Connection Failed");
        console.log(err.message);
    });

// Default Route
app.get("/", (req, res) => {
    res.send("🚩 Madhav Das Ji Temple Backend Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});