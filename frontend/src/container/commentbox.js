/** @format */

import React, { useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import Comments from "@material-ui/icons/ChatBubbleOutline";
const Commentbox = (props) => {
  const history = useHistory();
  const [sucess, setsucces] = useState("");
  const tweets = props.data;

  const commentpage = () => {
    history.push({
      pathname: "/comment",
      state: { detail: props.data },
    });
  };

  return (
    <div>
      <Comments onClick={(e) => commentpage()}></Comments>
    </div>
  );
};
export default Commentbox;