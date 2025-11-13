const userModel = require("../models/user.model") ;
const foodPartnerModel = require("../models/foodPartner.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Logic for user registration
async function registerUser(req, res) {
    const {fullName, email, password} = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        email
    })
    
    if(isUserAlreadyExists){
        res.status(400).json({
            message: "User already exist with this email"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword
    }) 
    
     const token = jwt.sign(
        {id: user._id},process.env.JWT_SECRET)

        res.cookie("token", token);

        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id:user._id,
                email:user.email,
                fullName:user.fullName
            }
        }) 

}

// Logic for user login
async function loginUser(req, res) {
    const {email, password} = req.body;

    const user = await userModel.findOne({
        email
    })

    if(!user){
        res.status(400).json({message:"Invalid User or Password"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
   
    if(!isPasswordValid){
       res.status(400).json({message:"Invalid User or Password"})
    } 
    const token = jwt.sign({
        id:user._id}, process.env.JWT_SECRET) 
   
        res.cookie("token", token)

        res.status(200).json({message: "User logged in successfully",
            user: {
                id:user._id,
                email:user.email,
                fullName:user.fullName
            }
        })
}

// Logic for user logout
function logoutUser (req, res){
    res.clearCookie("token")
    res.status(200).json({message: "User logged out seccessfully"})
}

// Logic for foodpartner registration
async function registerFoodPartner(req, res) {
    const {name, email, password, phone, address} = req.body;
    const accountAlreadyExists = await foodPartnerModel.findOne({email});

    if(accountAlreadyExists){
      res.status(400).json({message: "Account already exists with this email"})
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password: hashedPassword,
        phone,
        address
    })

    const token = jwt.sign ({id:foodPartner._id}, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.status(201).json({message: "Food Partner registered successfully",
        user:{
            _id:foodPartner._id,
            name:foodPartner.name,
            email:foodPartner.email,
            phone:foodPartner.phone,
            address:foodPartner.address

        }
    })
}

// Logic for foodPartner login 
async function loginFoodPartner(req, res) {
    const {email, password} = req.body;

    const foodPartner = await foodPartnerModel.findOne({email});

    if(!foodPartner){
        res.status(400).json({message:"Invalid Email or Password"})
    }

    const passwordValid = await bcrypt.compare(password, foodPartner.password)
     if(!passwordValid){
        res.status(400).json({message:"Invalid Email or Password"})
    }

    const token = jwt.sign({id:foodPartner._id}, process.env.JWT_SECRET);
    res.cookie("token", token)
    res.status(200).json({message: "Food Partner logged in successfully",
        foodPartner:{
            _id: foodPartner._id,
            name:foodPartner.name,
            email:foodPartner.email
        }
    })
}

// Logic for foodpartner logout
function logoutFoodPartner(req, res) {
    res.clearCookie("token")
    res.status(200).json({message: "Food Partner logged out successfully"})
}


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
};