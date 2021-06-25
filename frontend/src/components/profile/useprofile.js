/** @format */

import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import { Card } from "react-bootstrap";
import axios from "axios";
import Retweet from "../../container/Retweet";
import { Link, useLocation, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import Navbar from "../../container/Navbars";
import Comment from "./userprofilecomment";
import Like from "../../container/Like";
import "./profile.css";
var jwt = require("jsonwebtoken");
const Userprofile = (props) => {
  const history = useHistory("");
  const [id, setId] = useState("");
  const [profile, setProfile] = useState("");
  const [follower, setFollower] = useState("");
  const [alltweets, setAlltweets] = useState("");
  const [count, setCount] = useState("");
  const location = useLocation();
  const token = localStorage.getItem("login");
  // console.log(token)
  var decode1 = jwt.decode(token);
  const loggeduserId = decode1.user.id;
  // console.log(loggeduserId)
  useEffect(async () => {
    const response = await axios.post("http://localhost:7000/api/userprofile", {
      username: location.state.detail,
    });
    setProfile(response.data.data);
    setCount(response.data.data.followersCount);
    if (loggeduserId === response.data.data._id) {
      history.push("/profile");
    }
    const followerlist = response.data.data.followers;
    const result = followerlist.filter((id) => id === loggeduserId);

    if (result.length === 0) {
      setFollower(true);
    } else {
      setFollower(false);
    }
    setId(response.data.data._id);

    const id = response.data.data._id;
    console.log(id);
    const profiletweet = await axios.post(
      "http://localhost:7000/api/usertweet",
      { id }
    );
    console.log(profiletweet.data.tweets);
    setAlltweets(profiletweet.data.data.alltweets);
  }, [location]);

  const Follow = async (e) => {
    const profileid = profile._id;
    const resp = await axios.post(
      "http://localhost:7000/api/follow",
      { userid: profileid },
      {
        headers: {
          "x-auth-token": localStorage.getItem("login"),
        },
      }
    );

    console.log(resp.data.user.followersCount);

    setFollower(false);
    setCount(count + 1);
  };
  const UnFollow = async (e) => {
    const profileid = profile._id;
    const resp = await axios.post(
      "http://localhost:7000/api/unfollow",
      { userid: profileid },
      {
        headers: {
          "x-auth-token": localStorage.getItem("login"),
        },
      }
    );

    console.log(resp.data.user.followersCount);

    setCount(count - 1);

    setFollower(true);
  };

  return (
    <div>
      <Navbar></Navbar>
      {props && (
        <div class="padding">
          <div class="col-md-7">
            <div class="card">
              {" "}
              <img
                class="card-img-top"
                src="https://img.freepik.com/free-photo/pile-3d-twitter-logos_1379-879.jpg?size=626&ext=jpg"
                alt="Card image cap"
              />
              <div class="card-body little-profile text-center">
                <div class="pro-img">
                  <img
                    src="data:image/jpeg;base64,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"
                    alt="user"
                  />
                </div>
                <h3 class="m-b-0">{profile.fullname}</h3>
                <span>@{profile.username}</span>
                <div>{profile.bio}</div>
                <div>
                  <span>Joined </span>
                  {new Date(profile.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                  })}
                  <div>
                    {follower === true ? (
                      <Button
                        className="tweetBox__tweetButton"
                        onClick={() => Follow()}
                      >
                        Follow
                      </Button>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    {follower === false ? (
                      <Button
                        className="tweetBox__tweetButton"
                        onClick={() => UnFollow()}
                      >
                        UnFollow
                      </Button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div class="row text-center m-t-20">
                  <div class="col-lg-4 col-md-4 m-t-20">
                    <h3 class="m-b-0 font-light">{profile.tweetsCount}</h3>
                    <small>Tweets</small>
                  </div>
                  <div class="col-lg-4 col-md-4 m-t-20">
                    <h3 class="m-b-0 font-light">{count}</h3>
                    <small>Followers</small>
                  </div>
                  <div class="col-lg-4 col-md-4 m-t-20">
                    <h3 class="m-b-0 font-light">{profile.followingCount}</h3>
                    <small>Following</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        {alltweets &&
          alltweets.map((tweet, index) => {
            console.log(tweet);
            const userid = localStorage.getItem("id");
            const createdAt = new Date(tweet.createdAt).toLocaleDateString(
              "en-GB",
              {
                day: "numeric",
                month: "short",
              }
            );
            // if (JSON.stringify(tweet.likes[index]) === JSON.stringify(userid)) {
            //   const success = true;
            //   localStorage.setItem("sucess", success);
            // }
            if (tweet._id) {
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
                        colors={["red", "green", "blue"]}
                      />
                      <div className="data">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "left",
                            justifyContent: "left",
                          }}
                        >
                          <b>{profile.fullname}</b>@{profile.username}
                          <span> </span>
                          {createdAt}
                        </div>
                        <div
                          style={{
                            marginBottom: "3%",
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
            } else {
              return (
                <Card
                  className="shadow p-3 mb-2 bg-white rounded"
                  style={{
                    width: "50%",
                    marginRight: "auto",
                    marginLeft: "auto",
                  }}
                >
                  <span style={{ marginRight: "auto", marginBottom: "1%" }}>
                    {tweet.retweetUserName} retweeted tweet of
                    <b>@{tweet.userName}</b>
                  </span>

                  <div className="col d-flex">
                    <Avatar
                      name={tweet.fullname[0]}
                      size="50"
                      round={true}
                      colors={["red", "green", "blue"]}
                    />
                    <div className="data">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "left",
                          justifyContent: "left",
                        }}
                      >
                        <b>{tweet.fullname}</b>@{tweet.userName}
                        <span> </span>
                        {new Date(tweet.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                        })}
                      </div>
                      <div
                        style={{
                          marginBottom: "3%",
                          alignItems: "left",
                          justifyContent: "left",
                        }}
                      >
                        {tweet.text}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            }
          })}
      </div>
    </div>
  );
};
export default Userprofile;
