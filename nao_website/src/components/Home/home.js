import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="nao" path="/">
            Générateur de cartes
          </Navbar.Brand>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link href="nao">Nao</Nav.Link>
            <Nav.Link href="organizations">Organizations</Nav.Link>
            <Nav.Link href="#cards">Cartes</Nav.Link>
            <Nav.Link href="login" path="/login">
              Se connecter
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Home;
