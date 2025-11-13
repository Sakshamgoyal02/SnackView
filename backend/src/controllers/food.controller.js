const foodModel = require("../models/food.model");
const likeModel = require("../models/like.model");
// const likeFood = require("../models/like.model");
const saveModel = require("../models/save.model");
const storageService = require("../services/storage.service");
const {v4:uuid} = require("uuid");

// Logic for creating food item in the db
async function createFood(req, res) {

    // console.log(req.foodPartner);
    // console.log(req.body)
    console.log(req.file)
    
    // fileUploadResult contains all the data and url that our cloud storage returns
    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid() )
    console.log(fileUploadResult)

    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    })

    res.status(201).json({message: "Food item created successfully",
      Fooditem: foodItem
    })
}

// Logic for getting food items on the ui
async function getFoodItems(req, res) {
    const foodItems = await foodModel.find({});

    res.status(200).json({message: "Food Items fetched successfully",
      Fooditems: foodItems
    });
};

// Logic for like counts
//  async function likeFood(req, res) {
//      const {foodId} = req.body;
//      const user = req.user;

//      const isAlreadyLiked = await likeModel.findOne(
//       {user:user._id,
//         food: foodId
//       })

//       if(isAlreadyLiked){
//         await likeModel.deleteOne({
//           user: user._id,
//          food: foodId
//         })

//         await foodModel.findByIdAndUpdate(foodId,{
//           $inc: {likeCount: -1}
//         })
//        return res.status(200).json({message: "Food unliked succesfully"})
//       }
      
//       const like = await likeModel.create({
//         user: user._id,
//         food: foodId
//       })

//        await foodModel.findByIdAndUpdate(foodId,{
//           $inc: {likeCount: 1}
//         })
//           res.status(201).json({message: "Food liked succesfully",
//             like
//           })

//  }

async function likeFood(req, res) {
  try {
    const { foodId } = req.body;
    const user = req.user;

    if (!foodId) {
      return res.status(400).json({ message: "Missing foodId" });
    }

    console.log("🟢 likeFood called for:", foodId, "by user:", user.email);

    const isAlreadyLiked = await likeModel.findOne({
      user: user._id,
      food: foodId
    });

    if (isAlreadyLiked) {
      await likeModel.deleteOne({
        user: user._id,
        food: foodId
      });

      await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: -1 }
      });

      return res.status(200).json({ message: "Food unliked successfully" });
    }

    const like = await likeModel.create({
      user: user._id,
      food: foodId
    });

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { likeCount: 1 }
    });

    res.status(201).json({
      message: "Food liked successfully",
      like
    });
  } catch (err) {
    console.error("❌ Error in likeFood:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


//  Logic for users who liked the fooditem
async function saveFood(req, res) {
  const {foodId} = req.body;
  const user = req.user;
  
  const isAlreadySaved = await saveModel.findOne({
    user: user._id,
    food: foodId
  })

  if(isAlreadySaved){
     await saveModel.deleteOne({
      user: user._id,
      food: foodId
     })

     return res.status(200).json({message : "Food unsaved successfully"})
  }

  const save = await saveModel.create({
    user: user._id,
    food: foodId
  })
       return res.status(201).json({message : "Food saved successfully",
        save
       })
}

async function getSaveFood(req, res) {
  console.log("🟢 Entered getSaveFood route");

  try {
    console.log("🟢 Entered getSaveFood");

    const user = req.user;
    console.log("User:", user);

    if (!user || !user._id) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }

    const savedFoods = await saveModel
      .find({ user: user._id })
      .populate("food");

    console.log("Fetched saved foods:", savedFoods);

    if (!savedFoods || savedFoods.length === 0) {
      return res.status(404).json({ message: "No saved foods found" });
    }

    return res.status(200).json({
      message: "Saved foods found successfully",
      savedFoods,
    });
  } catch (err) {
    console.error("❌ Error fetching saved foods:", err);
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
}



module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSaveFood
}