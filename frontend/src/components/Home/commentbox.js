/** @format */

import React, { useState } from "react";
import { Link, useHistory} from "react-router-dom";
import Comments from "@material-ui/icons/ChatBubbleOutline";
const Commentbox = (props) => {
  const history = useHistory();
  // const tweets = props.data._id;
  const id = props.data._id;
  const commentpage = () => {
    history.push({
      pathname: "/comment/"+id,
    });
  };
  return (
    <div>
      <Comments  onClick={(e) => commentpage()}></Comments>
    </div>
  );
};
export default Commentbox;