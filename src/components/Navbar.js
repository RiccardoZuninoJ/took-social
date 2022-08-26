import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { auth } from '../utils/firebase';
import { useState } from 'react';

function Navigation(props) {

  return (
    <Navbar bg="warning" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Took Social</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="https://github.com/RiccardoZuninoJ">View this on GitHub</Nav.Link>
            <Nav.Link onClick={() => auth.signOut()}>Logout</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
}

export default Navigation;