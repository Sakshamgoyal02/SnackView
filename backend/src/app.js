const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");
const restaurantRoutes = require("./routes/restaurant.routes");
const cors = require("cors");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://snack-view-frontend.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/restaurant", restaurantRoutes);

module.exports = app;