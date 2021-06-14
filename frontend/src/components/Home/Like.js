/** @format */

import React, { useState, useEffect } from "react";
import LikeButton from "@material-ui/icons/FavoriteTwoTone";  
const Like = () => {
    const toggleLike = () => {
        console.log("sss")
        return <div><LikeButton style={{ color:"red"}}></LikeButton></div>
    }
    return (
      <div>
        <LikeButton onClick={() => toggleLike()} />
      </div>
    );
}
export default Like;