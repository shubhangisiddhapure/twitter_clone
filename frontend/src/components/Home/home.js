/** @format */

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "react-bootstrap";
import Like from "./Like"


import NavBar from "../../container/navbar";
import Tweetbox from "../../container/tweetbox";
import { Avatar } from "@material-ui/core";
import "./home.css";
const Home = (props) => {
  const [tweets, settweets] = useState("");
  const location = useLocation();
  useEffect(() => {
    const tweet = location.state.detail;
    settweets(tweet);
  }, [location]);
  console.log(tweets);
  return (
    <div>
      <NavBar></NavBar>
      <div>
        <br></br>
        <Tweetbox />
        {tweets &&
          tweets.map((tweet, index) => {
            console.log(tweet.likes);
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
                      src="https://pbs.twimg.com/profile_images/1266938830608875520/f-eajIjB_400x400.jpg"
                      style={{ width: "15%", height: "20%" }}
                    />
                    <div className="data">
                      <b>{tweet.user.fullname}</b>
                    </div>
                    <div>
                      @{tweet.user.username}
                    </div>
                    <Card.Body>
                      <div>
                        <h5>tweet</h5>
                        {tweet.text}
                      </div>
                    </Card.Body>
                  </div>
                  <div className="col d-flex">
                    <div className="rowdata">
                      <Like/>{tweet.likesCount}
                    </div>
                    <div className="rowdata">
                      <h5>Comment</h5>
                      {tweet.replaytotweetCount}
                    </div>
                    <div className="rowdata">
                      <h5>Retweet</h5>
                      {tweet.retweetCount}
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
