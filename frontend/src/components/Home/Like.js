/** @format */
import axios from "axios";
import { Link, useHistory, withRouter } from "react-router-dom";
import React, { useState, useEffect } from "react";
import LikeButton from "@material-ui/icons/FavoriteTwoTone";
const Like = (props) => {
  const like = props.data.likesCount;
  const islike = localStorage.getItem("sucess");
  const _id = props.data._id;
  const [sucess, setsuccess] = useState("");
  const [likesState, setLikes] = useState(like);
  const toggleLike = async () => {
    if (!sucess) {
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
      {sucess ? (
        <LikeButton style={{ color: "red" }} onClick={(e) => toggleLike()} />
      ) : (
        <LikeButton onClick={(e) => toggleLike()}> </LikeButton>
      )}
      {likesState}
    </div>
  );
};
export default Like;
