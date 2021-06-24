/** @format */
import "./tweetbox.css";
import axios from "axios";
import Like from "./Like";
import Navbar from "./Navbars";
import ShareIcon from "@material-ui/icons/Share";
import Postcomment from "./postcomment";
import Comments from "@material-ui/icons/ChatBubbleOutline";
import { useHistory, useParams, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Button } from "@material-ui/core";
import Avatar from "react-avatar";
const Comment = (props) => {
  const history = useHistory();
  const [text, setText] = useState("");
  const [success, setsuccess] = useState("");
  const [error, seterror] = useState("");
  const [tweet, settweet] = useState("");
  let { id } = useParams();


  useEffect(async () => {
    const response = await axios.post(
      "http://localhost:7000/api/selected/tweet",
      { id }
    );
    console.log(response.data.data);
    settweet(response.data.data);
  }, []);

  const openComment = async () => {
    try {
      seterror(false);
      const resp = await axios.put(
        "http://localhost:7000/api/tweet/replaytweet",
        { id, text },
        {
          headers: {
            "x-auth-token": localStorage.getItem("login"),
          },
        }
      );
      console.log(resp);
      if (resp) {
        setsuccess("Comment added successfully");
      }
    } catch (err) {
      seterror("Please add Text");
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <br></br>
      {tweet && (
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
          <div className="col d-flex">
            <div className="rowdata">
              <Like data={tweet} />
            </div>
            <div className="rowdata">
              {" "}
              <Comments />
              {tweet.replaytotweetCount}
            </div>
            <div className="rowdata">
              <ShareIcon />
              {tweet.retweetCount}
            </div>
          </div>
        </Card>
      )}
      <Postcomment></Postcomment>
      <Card style={{ width: "50%", marginRight: "auto", marginLeft: "auto" }}>
        <div className="tweetBox">
          <form>
            <div className="tweetBox__input">
              <Avatar
                name="T"
                size="50"
                round={true}
                colors={["blue","red"]}
              />
              {/* <img url="https://pbs.twimg.com/profile_images/1266938830608875520/f-eajIjB_400x400.jpg" /> */}
              <input
                value={text}
                placeholder="Tweet your reply"
                type="text"
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <Button
              onClick={() => openComment()}
              className="tweetBox__tweetButton"
            >
              Reply
            </Button>
          </form>
        </div>
      </Card>
      {error && <p style={{ color: "red" }}> {error} </p>}
      {success}
    </div>
  );
};
export default Comment;
