const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: "Bookstore User",
  },
  profilePic: {
    type: String,
    default: "",
  },
  userType: {
    type: String,
    default: "user",
  },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
