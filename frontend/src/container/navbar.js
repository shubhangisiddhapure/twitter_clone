/** @format */

import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
const NavBar = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Nav className="mr-auto">
        <Nav.Link href="/profile">My Profile</Nav.Link>
      </Nav>
      <Nav className="mr-auto">
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-light">Search</Button>
        </Form>
      </Nav>
      <Nav className="ml-auto">
        <Nav.Link href="/">Logout</Nav.Link>
      </Nav>
    </Navbar>
  );
};
export default NavBar;
