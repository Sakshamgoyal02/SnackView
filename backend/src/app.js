const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");
const restaurantRoutes = require("./routes/restaurant.routes");

const app = express();

// ✅ Allowed origins (VERY IMPORTANT)
const allowedOrigins = [
  "https://snack-view-frontend.vercel.app",
  "http://localhost:5173"
];

// ✅ CORS configuration (handles credentials + dynamic origin)
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Handle preflight requests (CRITICAL for your issue)
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true
}));

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ Test route
app.get("/api", (req, res) => {
  res.send("API root working");
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/restaurant", restaurantRoutes);

module.exports = app;