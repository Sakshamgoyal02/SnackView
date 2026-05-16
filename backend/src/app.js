const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");
const restaurantRoutes = require("./routes/restaurant.routes");

const app = express();

// ✅ CORS configuration (IMPORTANT)
const allowedOrigin = "https://snack-view-frontend.vercel.app";

app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));

// ✅ Handle preflight requests explicitly
app.options("*", cors({
  origin: allowedOrigin,
  credentials: true
}));

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ Health check route
app.get("/api", (req, res) => {
  res.send("API root working");
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/restaurant", restaurantRoutes);

module.exports = app;