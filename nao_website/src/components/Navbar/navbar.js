import { Navbar, Container, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function MyNavbar() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="nao" path="/">
          Générateur de cartes
        </Navbar.Brand>
        <Nav>
          <NavItem>
            <Link className="nav-link" to="/nao">
              Nao
            </Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link" to="/organizations">
              Organisations
            </Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link" to="/nao">
              Cartes
            </Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link" to="/login">
              Se connecter
            </Link>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
