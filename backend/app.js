/** @format */
require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db.js");
const bodyParser = require("body-parser");

app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, x-auth-token, Accept,id"
  );
  next();
});
app.use(bodyParser.json());
connectDB();
const user = require("./src/route/auth.js");
app.use("/api/user", user);
const tweet = require("./src/route/post.js");
app.use("/api", tweet);
const comment = require("./src/route/user.js");
app.use("/api", comment);
// listen for requests
app.listen(7000, () => {
  console.log("Server is listening on port 7000");
});
