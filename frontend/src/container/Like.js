/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import LikeButton from "@material-ui/icons/FavoriteTwoTone";
var jwt = require("jsonwebtoken");
const Like = (props) => {
  const like = props.data.likesCount;
  const token = localStorage.getItem("login")
  var decode1 = jwt.decode(token);
  const loggeduserId=decode1.user.id;
  const id = props.data._id;
  const [sucess, setsuccess] = useState();
  const [likesState, setLikes] = useState(like);
   useEffect(async () => {
     const response = await axios.post(
       "http://localhost:7000/api/selected/tweet",
       { id }
     );
     const likeduserid = response.data.data.likes;
       const lengthlist = likeduserid.filter((id) => id === loggeduserId);
       if (lengthlist.length === 0) {
         setsuccess(false);
       } else {
         setsuccess(true);
       }
   }, []);
  // console.log(tweet)
  const toggleLike = async () => {
    if (!sucess) {
      const resp = await axios.put(
        "http://localhost:7000/api/tweet/toggleLike",
        { id },
        {
          headers: {
            "x-auth-token": localStorage.getItem("login"),
          },
        }
      );
      setLikes(likesState + 1);
      setsuccess(true);
    } else {
      const resp = await axios.put(
        "http://localhost:7000/api/tweet/toggleLike",
        { id },
        {
          headers: {
            "x-auth-token": localStorage.getItem("login"),
          },
        }
      );
      // console.log(resp);
      setLikes(likesState - 1);
      setsuccess(false);
    }
  };

  return (
    <div>
      {sucess ? (
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
