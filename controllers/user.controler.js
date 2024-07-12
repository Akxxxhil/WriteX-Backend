const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')


exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;

    if (!name || !email || !password || !confirmpassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating user",
    });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const oldUser = await User.findOne({ email });

    if (!oldUser) {
      return res.status(401).json({
        success: false,
        message: "Please sign up first",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Password is not correct",
      });
    }

    const payload = { id: oldUser._id, email: oldUser.email };
    const loginToken = jwt.sign(payload, process.env.JWT_KEY);

    return res.status(200).json({
      success: true,
      loginToken: loginToken,
      data: {
        token: loginToken,
        id: oldUser._id
      },
      message: "Login success",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login failure",
    });
  }
};

exports.userDetails = async (req, res) => {
  try {
    const { id } = req.params; 
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required", 
      });
    }
    const userDetails = await User.findById(id); 
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      userDetails,
      message: "User details fetched successfully", 
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching user details",
    });
  }
};



exports.userUpdate=async(req,res)=>{
  try {
    const {id}=req.params;
    const{name}=req.body
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required", 
      });
    }
    const upadteuser=req.body
    const updateDetails=await User.findByIdAndUpdate(id,upadteuser,{new:true})
    if (!updateDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      updateDetails,
      message: "User details fetched successfully", 
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching user details",
    });
  }
}

