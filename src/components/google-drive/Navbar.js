import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NavbarComponent() {
  return (
    <Navbar bg="light" expand="sm">
    <Navbar.Brand  bg="light" expand="sm" as={Link} to="/">
      Google Drive            
    </Navbar.Brand>
    <Nav expand="sm">
      <Nav.Link as={Link} to="/profile">
        Profile
      </Nav.Link>
    </Nav>
  </Navbar>
  )
}
