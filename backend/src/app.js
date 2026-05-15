const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");
const restaurantRoutes = require("./routes/restaurant.routes");
const cors = require("cors");

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://snack-view-frontend.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true
}));

app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/restaurant", restaurantRoutes);

module.exports = app;