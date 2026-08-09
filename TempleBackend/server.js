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
const settingsRoutes = require("./routes/settingsRoutes");
const aartiRoutes = require("./routes/aartiRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

const app = express();


// ======================================================
// CORS
// ======================================================

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://madhav-das-temple-website.vercel.app",
    "https://madhav-das-temple-website-kfc2.vercel.app"
];

app.use(
    cors({
        origin: function (origin, callback) {

            // Allow requests without an Origin
            // Example: Postman, PowerShell, server-to-server
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            console.log("❌ CORS blocked origin:", origin);

            return callback(
                new Error("Not allowed by CORS")
            );
        },

        credentials: true,

        methods: [
            "GET",
            "POST",
            "PUT",
            "DELETE",
            "PATCH",
            "OPTIONS"
        ],

        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ]
    })
);


// ======================================================
// BODY PARSER
// ======================================================

app.use(express.json());


// ======================================================
// STATIC FOLDER FOR UPLOADED IMAGES
// ======================================================

app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);


// ======================================================
// API ROUTES
// ======================================================

app.use("/api/auth", authRoutes);

app.use("/api/gallery", galleryRoutes);

app.use("/api/events", eventRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/users", userRoutes);

app.use("/api/settings", settingsRoutes);

app.use("/api/aarti", aartiRoutes);

app.use("/api/services", serviceRoutes);


// ======================================================
// TEST POSTGRESQL CONNECTION
// ======================================================

pool.connect()
    .then((client) => {

        console.log(
            "✅ PostgreSQL Connected Successfully"
        );

        // Release the connection back to the pool
        client.release();

    })
    .catch((err) => {

        console.log(
            "❌ Database Connection Failed"
        );

        console.log(err.message);

    });


// ======================================================
// DEFAULT ROUTE
// ======================================================

app.get("/", (req, res) => {

    res.send(
        "🚩 Madhav Das Ji Temple Backend Running..."
    );

});


// ======================================================
// START SERVER
// ======================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `🚀 Server running on PORT ${PORT}`
    );

});