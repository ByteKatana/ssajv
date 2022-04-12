import React from "react"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Image from "react-bootstrap/Image"

// ================================================ //
export const AppNavbar = (props) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">
        <Image src="logo192.png" width="55px" alt="Logo" />{" "}
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">
          <h5>
            <b>Job List</b>
          </h5>
        </Nav.Link>
        <Nav.Link href="/statistics">
          <h5>
            <b>Statistics</b>
          </h5>
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default AppNavbar
