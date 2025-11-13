const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const restaurantController = require("../controllers/restaurant.controller")


const router = express.Router();

//  api for accessing the restaurant
router.get("/:id", authMiddleware.userMiddleware, 
            restaurantController.getRestaurantById)

module.exports = router;