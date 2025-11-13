const foodPartnerModel = require("../models/foodPartner.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function foodPartnerMiddleware (req, res, next){
    const token = req.cookies.token;
   
    if(!token){
        res.status(400).json({message: "Please Login First"});
    }
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foodPartner = await foodPartnerModel.findById(decoded.id);
    req.foodPartner = foodPartner;

    next ()
 }catch(err){
         res.status(401).json({message: "Invalid token"})
 }
}

async function userMiddleware(req, res, next) {
    const token = req.cookies.token;

    if(!token){
        res.status(400).json({message: "Please Login First"})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        req.user = user

        next()

    }catch(err){
         res.status(401).json({message: "Invalid token"})
    }
}

module.exports = {
    foodPartnerMiddleware,
    userMiddleware
}