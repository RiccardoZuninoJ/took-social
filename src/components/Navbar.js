import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { auth } from '../utils/firebase';
import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';

function Navigation(props) {

  const [authenticated, setAuthenticated] = useState(false);

  auth.onAuthStateChanged(user => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });

  return (
    <Navbar bg="warning" expand="lg">
      <Container>
        <Navbar.Brand href="/">Took Social</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="https://github.com/RiccardoZuninoJ">
              <FaGithub></FaGithub> {" "}
              View this on GitHub</Nav.Link>
            {authenticated ? <><Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href={"/user/" + auth.currentUser.uid}>Profile</Nav.Link>
              <Nav.Link onClick={() => auth.signOut()}>Logout</Nav.Link></>
              : <></>}
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default Navigation;