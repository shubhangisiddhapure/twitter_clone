/** @format */

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: false,
  },
  fullname: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
  },
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/douy56nkf/image/upload/v1594060920/defaults/txxeacnh3vanuhsemfc8.png",
  },
  bio: {
    type: String,
  },
  followers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  followersCount: {
    type: Number,
    default: 0,
  },
  followingCount: {
    type: Number,
    default: 0,
  },
  following: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  tweets: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
    },
  ],
  tweetsCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetToken: String,
  exprieToken: Date,
});
UserSchema.plugin(uniqueValidator, {
  type: "mongoose-unique-validator",
  message: "Error, expected {PATH} to be unique.",
});
module.exports = mongoose.model("User", UserSchema);
