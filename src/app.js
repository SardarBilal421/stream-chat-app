const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const memoryRoutes = require("./routes/memoryRoutes");
const webhookRoutes = require("./routes/webhookRoutes");

const app = express();

// CORS configuration to allow all origins
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Origin",
    "X-Requested-With",
    "Accept",
  ],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);
app.use("/memory", memoryRoutes);
app.use("/", webhookRoutes);

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
