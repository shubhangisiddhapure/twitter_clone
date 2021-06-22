/** @format */

const mongoose = require("mongoose");

const Tweetchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  files: {
    type: String,
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  likesCount: {
    type: Number,
    default: 0,
  },
  retweets: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  retweetCount: {
    type: Number,
    default: 0,
  },
  replaytoTweet: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Comment",
    },
  ],
  replaytotweetCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  
});

module.exports = mongoose.model("Tweet", Tweetchema);
