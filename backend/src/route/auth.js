/** @format */

const express = require("express");
const User = require("../model/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { check, validationResult } = require("express-validator/check");
const process = require("process");
const jwtToken = process.env.jwtSecret;
const apiKey = process.env.SENDGRIDSECRT;

const router = express.Router();
const nodemailer = require("nodemailer");
const sendgridTransort = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransort({
    auth: {
      api_key: apiKey,
    },
  })
);
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
      const salt = await bcrypt.genSalt(10);
      profileFields.password = await bcrypt.hash(password, salt);
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

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "invalid credentials" }] });
      }

      //return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
          name:user.username
        },
      };
      jwt.sign(payload, jwtToken, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token});
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
  }
);


// forget Password;
router.post(
  "/resetPassword",
  [
    check("email", "please enter a valid email")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors });
    }
    try {
      crypto.randomBytes(32, async (err, buffer) => {
        if (err) {
          console.log(err);
        }
        const token = buffer.toString("hex");
        // console.log(buffer);
        const user = await User.findOne({ email: req.body.email });
        // console.log(user);
        if (!user) {
          return res
            .status(500)
            .json({ error: "user dont exist with that email" });
        }
        user.resetToken = token;
        user.expireToken = Date.now() + 360000;
        const result = await user.save();
        if (result) {
          transporter.sendMail({
            to: user.email,
            from: "siddhapureshubhangi@gmail.com",
            subject: "Password Reset",
            html: `
            <p> you requested for password reset</p>
            <h5>click on this <a href = "http://localhost:3000/${token}">link</a> to reset the password
            `
          });
          res.json({ messege: "check your email", token });
      }
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
  }
);
//new password API
router.post(
  "/newPassword",
  [
    check("password", "please enter a password")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors });
    }
    try {
      const newPassword = req.body.password;
      const sentToken = req.body.token;
      console.log(sentToken);
      const user = await User.findOne({ resetToken: sentToken });
      // console.log(user);
      if (!user) {
        return res.status(500).json({ error: "try again session expired" });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      user.resetToken = undefined;
      user.expireToken = undefined;
      const savedUser = await user.save();
      if (savedUser) {
        res.json({ message: "password updated success" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
