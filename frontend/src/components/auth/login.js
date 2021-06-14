/** @format */

import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import { Link, useHistory, withRouter } from "react-router-dom";
import "./style.css";
const Login = props => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [error, setError] = useState("");
  const formSubmitHandler = async () => {
    try {
      if (email.length === 0 || password.length === 0) {
        setError("Please fill all the fields");
        return false;
      }
      
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(email)) {
        setError("Please enter a valid email id");
        return false;
      }
      if (password.length < 5) {
        setError("password must be atleast 6 character long");
        return false;
      }
      
      const data = { email, password };
      console.log(data);
      const resp = await axios.post(
        "http://localhost:7000/api/user/login",
        data
      );
      const Token = resp.data.token;
      if (Token) {
        const token = localStorage.setItem("login", JSON.stringify(resp.token));
      } 
      const response = await axios.get("http://localhost:7000/api/alltweet");
      if (response) {
        console.log("ss", response);
        history.push({
          pathname: "/home",
          state: { detail: response.data.data },
        });
        return true;
      }
    } catch (err) {
      setError("Inavalid Details");
      return false
    }
  };
  return (
    <div className="login">
      <Card
        className="container"
        style={{ width: "30%", padding: "3%", marginBottom: "15%" }}
      >
        <Form>
          <Form.Group controlId="formBasicEmail">
            <img
              src="data:image/png;base64,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"
              style={{ width: "20%", height: "10%" }}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>
              <h4> Log-In-Here</h4>
            </Form.Label>
            <Form.Control
              input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
            />
          </Form.Group>
          {error && <div style={{ color: `red` }}>{error}</div>}
          <Button
            variant="primary"
            type="button"
            block
            onClick={() => formSubmitHandler()}
          >
            Submit
          </Button>
          <Form.Group controlId="formBasicPassword">
            <div className="link">
              Don't have an account? <span></span>
              <Link exact to="/signup">
                Signup
              </Link>
            </div>
            <div className="link">
              <Link exact to="/forget-password">
                Forget Password
              </Link>
            </div>
          </Form.Group>
        </Form>
      </Card>
    </div>
  );
};
export default withRouter(Login);
