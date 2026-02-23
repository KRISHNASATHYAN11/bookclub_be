const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  let userName = req.body.userName;
  let email = req.body.email;
  let password = req.body.password;

  try {
    if (userName && email && password) {
      // operations
      let existingUser = await userModel.findOne({ email: email });
      if (existingUser) {
        res
          .status(409)
          .json({ messsage: "user with this email id Already exist" });
      } else {
        let newUser = new userModel({ userName, email, password });
        await newUser.save();
        res.status(201).json(newUser);
      }
    } else {
      res.status(400).json({ message: "Please fill the fields" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;

    let existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      if (existingUser.password == password) {
        let payload = {
          email: existingUser.email,
          userType: existingUser.userType,
          userName: existingUser.userName,
        };

        let token = await jwt.sign(payload, process.env.jwtSecret);

        res.status(200).json({
          message: "Login Successfull",
          token: token,
          user: existingUser,
        });
      } else {
        res.status(401).json({ message: "password is incorrect" });
      }
    } else {
      res
        .status(404)
        .json({ message: "there is no user with this email id registered" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.googleLogin = async (req, res) => {
  try {
    let { userName, email, profilePic } = req.body;
    let existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      // login
      let payload = {
        email: existingUser.email,
        userType: existingUser.userType,
        userName: existingUser.userName,
      };
      let token = await jwt.sign(payload, process.env.jwtSecret);
      res.status(200).json({
        message: "Google Login Success",
        token: token,
        user: existingUser,
      });
    } else {
      // register
      let newUser = new userModel({
        userName,
        email,
        profilePic,
        // in real applications we generate random passwords
        password: "googleasdf",
      });

      newUser.save();
      let payload = {
        email: newUser.email,
        userType: newUser.userType,
        userName: newUser.userName,
      };
      let token = await jwt.sign(payload, process.env.jwtSecret);
      res.status(201).json({
        message: " successfull",
        token: token,
        user: newUser,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Occurred in Server" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    let { userName, password, bio } = req.body;
    let image = req.file ? req.file.filename:undefined;
    console.log(image);

    let { id } = req.params;

    let updatedUser = await userModel.findByIdAndUpdate(
      { _id: id },
      { userName, password, bio, profilePic: image },
      { new: true }
    );

    res.status(200).json({ message: "Successfully updated", updatedUser });

    // new;true is used to return the updated data (updated data frntendilott pass cheyan)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong in server" });
  }
};


