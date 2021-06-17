/** @format */

import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useLocation, useHistory, useParams } from "react-router-dom";
import axios from "axios";

import LikeButton from "@material-ui/icons/FavoriteTwoTone";
import Comments from "@material-ui/icons/ChatBubbleOutline";
import { Avatar } from "@material-ui/core";
import "../../components/Home/home.css"
const MyTweets = (props) => {
  console.log("tweetbox");
  const [tweetbox, settweetbox] = useState("");
  console.log(localStorage.getItem("login"));
  const location = useLocation();
  useEffect(async () => {
    const response = await axios.get("http://localhost:7000/api/myTweet", {
      headers: {
        "x-auth-token": localStorage.getItem("login"),
      },
    });
    if (response) {
      settweetbox(response.data.data);
      console.log(tweetbox);
    }
  }, []);

  return (
    <div>
      {tweetbox &&
        tweetbox.map((tweet, index) => {
          const createdAt = new Date(tweet.createdAt).toLocaleDateString(
            "en-GB",
            {
              day: "numeric",
              month: "short",
            }
          );
          return (
            <div>
              <Card
                className="shadow p-3 mb-2 bg-white rounded"
                style={{
                  width: "50%",
                  marginRight: "auto",
                  marginLeft: "auto",
                }}
              >
                <div className="row d-flex">
                  <Avatar
                    src="https://pbs.twimg.com/profile_images/1266938830608875520/f-eajIjB_400x400.jpg"
                    style={{ width: "8%", height: "5%", marginLeft: "2%" }}
                  />
                  <div className="data">
                    <b>{tweet.user.fullname}</b>@{tweet.user.username}
                    <span> </span>
                    {createdAt}
                  </div>
                </div>
                <div style={{ marginBottom: "3%" }}>{tweet.text}</div>
                <div className="col d-flex">
                  <div className="rowdata">
                    <LikeButton />
                    {tweet.likesCount}
                  </div>
                  <div className="rowdata">
                    <Comments />
                    {tweet.replaytotweetCount}
                  </div>
                  <div className="rowdata">
                    <h5>Retweet</h5>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
    </div>
  );
};
export default MyTweets;
