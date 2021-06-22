/** @format */

import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import { Card, Button } from "react-bootstrap";
import Like from "../../container/Like";
import { useLocation } from "react-router-dom";
import Comment from "./commentbox";
import Retweet from "../../container/Retweet"
import axios from "axios";
import NavBar from "../../container/searchbar";
import Tweetbox from "../../container/tweetbox";

import "./home.css";
const Home = (props) => {
  const [tweets, settweets] = useState("");
  // const [mytTweets, setmyTweets] = useState("");
  const location = useLocation();
  useEffect(async () => {
    console.log("shubhangi");
    const response = await axios.get("http://localhost:7000/api/alltweet", {
      headers: {
        "x-auth-token": localStorage.getItem("login"),
      },
    });
    settweets(response.data.data);
    // setmyTweets(response.data.MyTweets);
    console.log(response.data.data);
  }, []);

  return (
    <div>
      <NavBar></NavBar>
      <div>
        <br></br>
        <Tweetbox />
        {tweets &&
          tweets.map((tweet, index) => {
            // console.log(tweet);
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
                  <div className="col d-flex">
                    <Avatar
                      name={tweet.user.fullname}
                      size="50"
                      round={true}
                      colors={['red', 'green', 'blue']}
                    />
                    <div className="data">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "left",
                          justifyContent: "left",
                        }}
                      >
                        <b>{tweet.user.fullname}</b>@{tweet.user.username}
                        <span> </span>
                        {createdAt}
                      </div>
                      <div
                        style={{
                          marginBottom: "3%",
                          // display: "flex",
                          alignItems: "left",
                          justifyContent: "left",
                        }}
                      >
                        {tweet.text}
                      </div>
                    </div>
                  </div>
                  <div className="col d-flex">
                    <div className="rowdata">
                      <Like data={tweet} />
                    </div>
                    <div className="rowdata">
                      <div className="col d-flex">
                        <Comment data={tweet} />
                        {tweet.replaytotweetCount}
                      </div>
                    </div>
                    <div className="rowdata">
                      <Retweet data={tweet} />
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Home;
