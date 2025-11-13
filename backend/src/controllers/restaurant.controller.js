const foodPartnerModel = require("../models/foodPartner.model");
const foodModel = require("../models/food.model");

async function getRestaurantById(req, res){

         const restaurantId = req.params.id;
         const restaurant = await foodPartnerModel.findById(restaurantId);

         const foodItemsByRestaurant = await foodModel.find({foodPartner:restaurantId})
           
         if(!restaurant){   
          return  res.status(404).json({message: "Restaurant not found"})
         }
         return res.status(200).json({message: "Restaurant retrieved successfully",
        
            restaurant:{
                ...restaurant.toObject(),
                foodItems: foodItemsByRestaurant
            }
            // console.log(restaurant)
          })
 
} 
module.exports ={getRestaurantById} ;