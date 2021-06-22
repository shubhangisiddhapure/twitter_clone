/** @format */

import React, { useState } from "react";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import "./style.css";
const Newpassword = () => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [confrimPassword, setconfrimPassword] = useState("");
  const [error, setError] = useState("");
  const { token } = useParams();
  const data = async () => {
    try {
      if (password.length === 0 || confrimPassword.length === 0) {
        setError("Please fill all the fields");
        return false;
      }
      if (password.length < 5) {
        console.log("sidd");
        setError("Password length should be at least 5 letters");
        return false;
      }
      if (password !== confrimPassword) {
        setError("Invalid password");
        return false;
      }
      console.log(password);
      console.log(confrimPassword);
      const resp = await axios.post(
        "http://localhost:7000/api/user/newPassword",
        { password, token }
      );
      let data = resp.data;
      if (data) {
        alert("password updated success");
        history.push("/");
        return true;
      }
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div
      className="col d-flex justify-content-center"
      style={{ backgroundColor: "#eee", height: "100vh", width: "100vw" }}
    >
      <Card className="resetpage">
        <h2>New Password</h2>
        <p>Enter your new password here!</p>
        <input
          className="inputdatas"
          type="password"
          name="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="inputdatas"
          type="password"
          name="confrimPassword"
          placeholder="Confirm Password"
          value={confrimPassword}
          onChange={(e) => setconfrimPassword(e.target.value)}
        />
        {error && <div style={{ color: `red` }}>{error}</div>}
        <Button type="button" className="inputdatas" onClick={() => data()}>
          Change Password
        </Button>
      </Card>
    </div>
  );
};
export default withRouter(Newpassword);
