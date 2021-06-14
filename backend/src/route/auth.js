/** @format */

const express = require("express");
const User = require("../model/user.js");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator/check");
const process = require("process");
const jwtToken = process.env.jwtSecret;

const router = express.Router();

//post api/aut
// autthenticate user & get token

router.post(
  "/create",
  [
    check("username", "username is required").not().isEmpty(),
    check("password", "password is required").not().isEmpty(),
    check("gender", "gender is required").not().isEmpty(),
    check("email", "email is required").isEmail().exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, fullname, username, password, avatar, bio } = req.body;
    // Build profile object
    const profileFields = {};
    if (bio) profileFields.bio = bio;
    if (email) profileFields.email = email;
    if (fullname) profileFields.fullname = fullname;
    if (username) profileFields.username = username;
    if (password) profileFields.password = password;
    if (avatar) profileFields.avatar = avatar;

    console.log(profileFields.email);
    // Build social object
    try {
      let profile = await User.findOne({ email });
      if (profile) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User alearday exite" }] });
      }
      // Create
      const salt = await bycrypt.genSalt(10);
      profileFields.password = await bycrypt.hash(password, salt);
      profile = new User(profileFields);
      await profile.save();
      //return jsonwebtoken
      const payload = {
        user: {
          id: profile.id,
        },
      };
      jwt.sign(payload, jwtToken, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

router.post(
  "/login",
  [
    check("email", "please enter a valid email").isEmail(),
    check("password", "please enter valid password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      //see user exite
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "invalid credentials" }] });
      }

      const isMatch = await bycrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "invalid credentials" }] });
      }

      //return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, jwtToken, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
