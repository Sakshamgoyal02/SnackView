
const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const foodController = require("../controllers/food.controller");
const router = express.Router();
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage()
})

// api for creating a fooditem
router.post("/",authMiddleware.foodPartnerMiddleware,
     upload.single("video"), foodController.createFood)

// api for getting food items on the ui
router.get("/", authMiddleware.userMiddleware, foodController.getFoodItems) 

// api for food likes count
router.post("/like", authMiddleware.userMiddleware, foodController.likeFood)
 

router.post("/save", authMiddleware.userMiddleware, foodController.saveFood)

router.get("/saved", authMiddleware.userMiddleware, foodController.getSaveFood)


module.exports = router;