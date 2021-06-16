/** @format */
import React  from "react";
import { Navbar, Nav, Form, FormControl, Card } from "react-bootstrap";

const Navbars = () => {
  return (
    <div>
      <Navbar style={{ backgroundColor: "#50b7f5" }}>
        <Nav className="ml-auto">
          <Nav.Link href="/Home">Go Back</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};
export default Navbars;
