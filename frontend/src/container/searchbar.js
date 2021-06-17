/** @format */

import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, FormControl,  } from "react-bootstrap";
import {  useHistory } from "react-router-dom";
import axios from "axios";
const NavBar = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get(
        "http://localhost:7000/api/allusers"
      );
      setUsers(response.data.data);
    };
    loadUsers();
  }, []);
  const onSuggestHandler = async (text) => {
  
    setText(text);
    setSuggestions([]);
    const data = text;
    console.log(data);
    const profile = await axios.post(
      "http://localhost:7000/api/userprofile",
      { username:data }
    );
    console.log(profile);
    if (profile) {
      console.log(profile.data.data);
      history.push({
        pathname: "/userprofile",
        state: { data: profile.data.data },
      });
      return true;
    }
  };
  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length >= 1) {
      matches = users.filter((user) => {
        const regex = new RegExp(`${text}`, "gi");
        return user.username.match(regex);
      });
    }
    console.log(matches);
    setSuggestions(matches);
    setText(text);
  };
  return (
    <div>
      <Navbar style={{ backgroundColor: "#50B7F5"}}>
        <Nav className="mr-auto">
          <Nav.Link href="/profile">My Profile</Nav.Link>
        </Nav>
        <Nav className="mr-auto">
          <Form>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              value={text}
              onChange={(e) => onChangeHandler(e.target.value)}
              //  onBlur={()=>{
              //    setTimeout(()=>{
              //       setSuggestions([])
              //    },100)
              //  }}
            />
            {suggestions &&
              suggestions.map((suggestion, i) => (
                <div
                  key={i}
                  className="suggestion mr-sm-2"
                  onClick={() => onSuggestHandler(suggestion.username)}
                >
                  {suggestion.username}
                </div>
              ))}
          </Form>
        </Nav>
        <Nav className="ml-auto">
          <Nav.Link href="/">Logout</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};
export default NavBar;
