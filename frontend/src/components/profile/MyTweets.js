/** @format */

import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useLocation, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import ShareIcon from "@material-ui/icons/Share";
import Profilecomment from "./profilecomment";
import Retweet from "../../container/Retweet";
import Like from "../../container/Like";
import Avatar from "react-avatar";
import "../../components/Home/home.css";
const MyTweets = (props) => {
  const [tweetbox, settweetbox] = useState("");
  const location = useLocation();
  useEffect(async () => {
    const response = await axios.get("http://localhost:7000/api/myTweet", {
      headers: {
        "x-auth-token": localStorage.getItem("login"),
      },
    });
    if (response) {
      settweetbox(response.data.data);

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
                        <b>{tweet.user.fullname}</b>@{tweet.user.username}
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
                        <Profilecomment data={tweet} />
                        {tweet.replaytotweetCount}
                      </div>
                    </div>
                    <div className="rowdata">
                      <Retweet data={tweet} />
                      {/* {tweet.retweetCount} */}
                    </div>
                  </div>
                </Card>
              </div>
            );
          }
          else {
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
                 You retweeted tweet of <b>@{tweet.userName}</b>
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
  );
};
export default MyTweets;
