/** @format */
const mongoose = require("mongoose");

const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../middleware/auth.js");
const User = require("../model/user.js");
const Tweet = require("../model/tweet.js");
const Comment = require("../model/comment.js");
//create a tweet
router.post(
  "/tweet",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors });
    }
    try {
      const newPost = new Tweet({
        text: req.body.text,
        user: req.user.id,
      });
      const tweet = await newPost.save();
      await User.findByIdAndUpdate(req.user.id, {
        $push: { tweets: tweet._id },
        $inc: { tweetsCount: 1 },
      });
      res.status(200).json({ success: true, data: tweet });
    } catch (err) {
      console.log(err);
      res.status(500).send("sever err");
    }
  }
);

//get all tweet for feed page
router.get("/alltweet", auth, async (req, res) => {
  try {
    const alltweets = [];
    const MyTweets = [];
    const userid = req.user.id;
    const tweets = await Tweet.find().sort("-createdAt").populate("user");
    if (tweets.length === 0) {
      return res.status(404).json({ msg: "All Tweets not found" });
    }
    for (let i = 0; i < tweets.length; i++) {
      if (tweets[i].user.id === userid) {
        alltweets.push(tweets[i]);
      };
      const followrid = tweets[i].user.followers;
      if (followrid.includes(userid)) {
        alltweets.push(tweets[i]);
      }
    }   
    return res
      .status(200)
      .json({ msg: "All tweets", data: alltweets });
  } catch (err) {
    console.log(err);
    return res.status(500).send("sever error");
  }
});
//like or unlike to tweet
router.put("/tweet/toggleLike", auth, async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.body.id);
    if (!tweet) {
      return res.status(404).json({ msg: "Tweet Not found" });
    }

    if (tweet.likes.includes(req.user.id)) {
      const index = tweet.likes.indexOf(req.user.id);
      tweet.likes.splice(index);
      tweet.likesCount = tweet.likesCount - 1;
      await tweet.save();
    } else {
      tweet.likes.push(req.user.id);
      tweet.likesCount = tweet.likesCount + 1;
      await tweet.save();
    }
    res.status(200).json({ msg: "Tweet", data: tweet });
  } catch (err) {
    res.status(500).send("sever error");
  }
});

//replay to tweet or comment on tweet
router.put(
  "/tweet/replaytweet",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors });
    }
    try {
      const tweet = await Tweet.findById(req.body.id);

      if (!tweet) {
        return res.status(404).json({ msg: "Tweet Not found" });
      }
      const newComment = new Comment({
        user: req.user.id,
        tweet: req.body.id,
        text: req.body.text,
      });
      const comment = await newComment.save();
      tweet.replaytoTweet.push(comment._id);
      tweet.replaytotweetCount = tweet.replaytotweetCount + 1;
      await tweet.save();

      let comments = await comment.populate("user");
      res.status(200).json({ success: true, data: comments });
    } catch (err) {
      console.log(err);
      res.status(500).send("sever error");
    }
  }
);
//get all comment of particuler tweer
router.post("/comment", async (req, res) => {
  try {
    const tweet = req.body.id;
    console.log(tweet);
    const comments = await Comment.find({ tweet })
      .sort("-createdAt")
      .populate("user");

    if (comments.length === 0) {
      return res.status(404).json({ msg: "comments not found" });
    }
    res.status(200).json({ msg: "All comments", data: comments });
  } catch (err) {
    console.log(err);
    res.status(500).send("sever error");
  }
});
//get mypost
router.get("/myTweet", auth, async (req, res) => {
  try {
    const user = req.user.id;
    const tweets = await Tweet.find({ user })
      .sort("-createdAt")
      .populate("user");

    if (tweets.length === 0) {
      return res.status(404).json({ msg: "tweets not found" });
    }
    return res.status(200).json({ msg: "All tweets", data: tweets });
  } catch (err) {
    console.log(err);
    return res.status(500).send("sever error");
  }
});
//get particular tweet by id
router.post("/selected/tweet", async (req, res) => {
  try {
    const _id = req.body.id;
    console.log(_id);
    const tweets = await Tweet.findById(req.body.id)
      .sort("-createdAt")
      .populate("user");
    return res.status(200).json({ msg: "All tweets", data: tweets });
  } catch (err) {
    console.log(err);
    return res.status(500).send("sever error");
  }
});

//do retweet (shear a tweet)
router.put("/reTweet", auth, async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.body.id);
    if (!tweet) {
      return res.status(404).json({ msg: "tweet not found" });
    }
    if (tweet.retweets.includes(req.user.id)) {
      return res.status(400).json({ message: "you alearday retweeted " });
    }
    tweet.retweets.push(req.user.id);
    tweet.retweetCount = tweet.retweetCount + 1;
    await tweet.save();
    await User.findByIdAndUpdate(req.user.id, {
      $push: { tweets: tweet._id },
      $inc: { tweetsCount: 1 },
    });
    return res.status(200).json({ success: true, data: tweet });
  } catch (err) {
    console.log(err);
    return res.status(500).send("sever error");
  }
});
//do undo retweet 
router.put("/undoRetweet", auth, async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.body.id);
    if (!tweet) {
      return res.status(404).json({ msg: "tweet not found" });
    }
  if (tweet.retweets.includes(req.user.id)) {
    const index = tweet.retweets.indexOf(req.user.id);
    tweet.retweets.splice(index, 1);
    tweet.retweetCount = tweet.retweetCount - 1;
    await tweet.save();
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { tweets: req.params.id },
      $inc: { tweetsCount: -1 },
    });
  }
    return res.status(200).json({ success: true, data: tweet });
  } catch (err) {
    console.log(err);
    return res.status(500).send("sever error");
  }
});

//getting all tweets of a searcha user
router.post("/usertweet",async(req,res)=>{
  const user=req.body.id
  // console.log(userid)
    try {
      const tweets = await Tweet.find({user}).sort("-createdAt").populate({
        path: "user",
        select: "username avatar fullname",
      });
      console.log(tweets)
      if (!tweets) {
        res.status(400).json({ msg: "tweets not found" });
      }
      else{res.status(200).json({ tweets });}
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
)



module.exports = router;
