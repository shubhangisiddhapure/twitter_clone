/** @format */

import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { Navbar, Nav, Form, FormControl, Card } from "react-bootstrap";
import axios from "axios";
import "./home.css";
const Profile = () => {
  const [profiles, setProfile] = useState();
  useEffect(async () => {
    const response = await axios.get("http://localhost:7000/api/myProfile", {
      headers: {
        "x-auth-token": localStorage.getItem("login"),
      },
    });
    setProfile(response.data.data);
  }, []);
  console.log(profiles);
  return (
    <div>
      <Navbar style={{ backgroundColor: "#50b7f5" }}>
        <Nav className="ml-auto">
          <Nav.Link href="/Home">Go Back</Nav.Link>
        </Nav>
      </Navbar>
      {profiles && (
        <div>
          <Card
            className="shadow p-3 mb-2 bg-white rounded"
            style={{
              width: "50%",
              marginTop: "2%",
              marginRight: "auto",
              marginLeft: "auto",
            }}
          >
            <div className="col d-flex">
              <div className="row d-flex">
                <div>
                  <Avatar
                    src="https://pbs.twimg.com/profile_images/1266938830608875520/f-eajIjB_400x400.jpg"
                    style={{ width: "50%", height: "50%", marginLeft: "2%" }}
                  />
                </div>
                <div>@{profiles.username} </div>
                <div>{profiles.bio}</div>
              </div>
              <div>
                <div>
                  <span>created at </span>
                  {new Date(profiles.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                  })}
                </div>
                <div>
                  <b>{profiles.fullname}</b>
                </div>
                <div>{profiles.followersCount}</div>
                <div>followingCount{profiles.followingCount}</div>
                <div></div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
export default Profile;
