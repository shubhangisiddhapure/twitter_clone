/** @format */

import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Card } from "react-bootstrap";
import "./style.css";
const Reset = () => {
  const [sucess, setsucess] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const Postdata = async () => {
    setError(false);
    try {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      console.log(email);
      if (!pattern.test(email)) {
        setError(true);
        return false;
      }
      const resp = await axios.post(
        "http://localhost:7000/api/user/resetPassword",
        { email }
      );
      let data = resp.data;
      if (data) {
        setsucess("Please Check your email to reset password");
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
          <div>{sucess && <span>{sucess}</span>}</div>
          <span className="resetdata">
            <h2>Reset Password</h2>
          </span>
          <p>
            Enter your email and we'll send you a link to get back into your
            account.
          </p>
          <input
            className="inputdata"
            type="email"
            name="email"
            placeholder="Enter email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          {error && <div style={{ color: `red` }}>Invalid Email</div>}
          <p className="resetcontainer">
            We'll never share your email with anyone else
          </p>
          <Button
            className="inputdata"
            type="button"
            onClick={() => Postdata()}
          >
            Send Login Link{" "}
          </Button>
        </Card>
      </div>
    );
};
export default Reset;
