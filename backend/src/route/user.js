/** @format */

const express = require("express");
const User = require("../model/user.js");
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

module.exports = router;
