/** @format */

import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useLocation, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import ShareIcon from "@material-ui/icons/Share";
import LikeButton from "@material-ui/icons/FavoriteTwoTone";
import Comments from "@material-ui/icons/ChatBubbleOutline";
// import { Avatar } from "@material-ui/core";
import Avatar from "react-avatar";
import "../components/Home/home.css";
const Postcomment = (props) => {
  const [commentbox, setcommentbox] = useState("");
  let { id } = useParams();
  const location = useLocation();
  useEffect(async () => {
    console.log(id);
    const response = await axios.post("http://localhost:7000/api/comment", {
      id,
    });
    if (response) {
      setcommentbox(response.data.data);
        // console.log(response.data);
         console.log(commentbox);
    }
  }, []);


  return (
    <div>
      {commentbox &&
        commentbox.map((tweet, index) => {
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
                    <LikeButton />
                  </div>
                  <div className="rowdata">
                    <Comments />
                  </div>
                  <div className="rowdata">
                    <ShareIcon />
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
    </div>
  );
};
export default Postcomment;
