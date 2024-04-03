const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const User = require("../models/userModal");

const signupToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });


  exports.signUpSeeker = async (req, res) => {
    try {
  
      console.log("Request Body:", req.body);
      console.log("File:", req.file);
    
      const {
        userName,
        email,
        password,
      } = req.body;
  
      const user = await User.create({
        userName,
        email,
        password,
      });
  
      const token = signupToken(user._id);
  
      res.status(200).json({
        status: "user submitted successfully",
        token,
      });
    } catch (err) {
      if (err.code === 11000 && err.keyPattern.email) {
        // Duplicate email error
        return res.status(400).json({
          status: "failed",
          message: "Email is already registered.",
        });
      } else if (err.code === 11000 && err.keyPattern.userName) {
        // Duplicate first name error
        return res.status(400).json({
          status: "failed",
          message: "User Name is already registered.",
        });
      } else {
        // For other errors, provide a generic message
        return res.status(400).json({
          status: "failed",
          message: err.message,
        });
      }
    }
  };





exports.loginUser =  async (req, res) => {
    try {
      const { email, password, user } = req.body;
      if (!email || !password ) {
        return res.status(400).json({
          message: "Please provide email, password.",
        });
      }
  
      let userModel;
  
        userModel = User;
        const userInstance = await userModel
          .findOne({ email })
          .select("password user _id");
  
        if (
          !userInstance ||
          !(await userInstance.comparePassword(
            password,
            userInstance.password
          )) ||
          userInstance.user !== user
        ) {
          return res.status(401).json({
            message: "incorrect email or password or user",
          });
        }
        const token = signupToken(userInstance._id);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const id = decoded.id;
        res.status(200).json({
          result: "successfully logged in",
          id,
          token,
        });

    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }



  exports.protect = async (req, res,next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
  console.log(req.headers.authorization.split(' '));
      if (!token) {
        return res.status(401).json({
          message: "Unauthorized - Missing token",
        });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
  
      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized - Missing user ID in token",
        });
      }
  
  next();
      
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized - Invalid token",
      });
    }
  };