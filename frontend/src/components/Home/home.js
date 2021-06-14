/** @format */

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {  Card } from "react-bootstrap";
import NavBar from "../../container/navbar";

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
      {tweets &&
        tweets.map((tweet, index) => {
          console.log(tweet.likes);
          return (
            <Card
              className="shadow p-3 mb-5 bg-white rounded"
              style={{ width: "100%" }}
            >
              <Card.Body>
                <div>
                  <h5>avatar</h5>
                  {tweet.user.avatar}
                </div>
                <div>
                  <h5>username</h5>
                  {tweet.user.username}
                </div>
                <div>
                  <h5>tweet</h5>
                  {tweet.text}
                </div>

                <div>
                  <h5>likes</h5>
                  {tweet.likesCount}
                </div>
                <div>
                  <h5>Comment</h5>
                  {tweet.replaytotweetCount}
                </div>
              </Card.Body>
            </Card>
          );
        })}
    </div>
  );
};
export default Home;
