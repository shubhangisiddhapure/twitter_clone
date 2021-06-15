/** @format */

const express = require("express");
const User = require("../model/user.js");
const { check, validationResult } = require("express-validator/check");
const auth = require("../middleware/auth.js");
const router = express.Router();

router.get("/myProfile", auth, async (req, res) => {
  try {
    const profile = await User.findById(req.user.id);
    if (!profile) {
      res.status(400).json({ msg: "Profile Not Found" });
    }
    res.status(200).json({ success: true, data: profile });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
router.get("/allusers", async (req, res) => {
  try {
    const users = await User.find().populate({
      path: "user",
      select: "fullname",
    });
    if (users.length === 0) {
      return res.status(404).json({ msg: "users not found" });
    }
    res.status(200).json({ msg: "All users", data: users });
  } catch (err) {
    console.log(err);
    res.status(500).send("sever error");
  }
});
router.get(
  "/userprofile",
  [check("username", "please enter username").exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username } = req.body;
    try {
      let user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "user not found" }] });
      } else {
        res.status(200).json({ msg: "user", data: user });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("sever error");
    }
  }
);

module.exports = router;
