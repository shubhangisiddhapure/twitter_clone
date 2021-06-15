/** @format */

import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import Like from "./Like";
import { useLocation } from "react-router-dom";
import Comment from "../../container/commentbox"
import axios from "axios";
import NavBar from "../../container/navbar";
import Tweetbox from "../../container/tweetbox";
import { Avatar } from "@material-ui/core";
import "./home.css";
const Home = (props) => {
  const [tweets, settweets] = useState("");
  const location = useLocation();
  useEffect(async () => {
    const response = await axios.get("http://localhost:7000/api/alltweet");
    settweets(response.data.data);
  }, []);

  return (
    <div>
      <NavBar></NavBar>
      <div>
        <br></br>
        <Tweetbox />
        {tweets &&
          tweets.map((tweet, index) => {
            console.log(tweet)
            const userid = localStorage.getItem("id");
            const createdAt = new Date(tweet.createdAt).toLocaleDateString(
              "en-GB",
              {
                day: "numeric",
                month: "short",
              }
            );
            if (JSON.stringify(tweet.likes[index]) === JSON.stringify(userid)) {
              const success = true;
              localStorage.setItem("sucess", success);
            }
            return (
              <div >
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
                  <div style={{marginBottom:"3%"}}>{tweet.text}</div>
                  <div className="col d-flex">
                    <div className="rowdata">
                      <Like data={tweet} />
                    </div>
                    <div className="rowdata">
                      <Comment data={tweet} />
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
