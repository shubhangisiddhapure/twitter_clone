/** @format */

import axios from "axios";
import { Link, useHistory, withRouter } from "react-router-dom";
import React, { useState, useEffect } from "react";
import LikeButton from "@material-ui/icons/FavoriteTwoTone";
var jwt = require("jsonwebtoken");
const Like = (props) => {
  const like = props.data.likesCount;
  const likeduserid = props.data.likes;
  console.log(likeduserid);
  const token = localStorage.getItem("login")
  var decode1 = jwt.decode(token);
  const loggeduserId=decode1.user.id;
  const islike = localStorage.getItem("sucess");
  const _id = props.data._id;
  const [sucess, setsuccess] = useState();
  const [likesState, setLikes] = useState(like);
  const lengthlist = likeduserid.filter(id => id === loggeduserId);
  console.log(lengthlist);

  const toggleLike = async () => {
   (likeduserid.pop(loggeduserId)) 
    console.log(likeduserid.length);
    if (sucess===false) {
      const resp = await axios.put(
        "http://localhost:7000/api/tweet/toggleLike",
        { _id },
        {
          headers: {
            "x-auth-token": localStorage.getItem("login"),
          },
        }
      );
      console.log(resp);
      setLikes(likesState + 1);
       setsuccess(true);
      
    } else {
      const resp = await axios.put(
        "http://localhost:7000/api/tweet/toggleLike",
        { _id },
        {
          headers: {
            "x-auth-token": localStorage.getItem("login"),
          },
        }
      );
      console.log(resp);
      setLikes(likesState - 1);
      setsuccess(false);
    }
  };

  return (
    <div>
      {lengthlist.length > 0 || sucess ? (
        <LikeButton
          style={{ color: "red" }}
          onClick={(e) => toggleLike()}
        />
      ) : (
        <LikeButton onClick={(e) => toggleLike()}> </LikeButton>
      )}

      {likesState}
    </div>
  );
};
export default Like;
