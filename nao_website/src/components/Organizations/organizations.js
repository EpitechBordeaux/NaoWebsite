import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./organization.css";

function Organizations() {
  const [organisations, setOrganisations] = useState([]);
  const [groups, setGroups] = useState([]);
  const [currentOrganization, setCurrentOrganization] = useState([
    -1,
    "Choisis une organisation",
  ]);

  const getAllOrganization = (event) => {
    event.preventDefault();
    fetch("http://localhost:5001/organizations/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setOrganisations(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (currentOrganization[0] !== -1) {
      fetch("http://localhost:5001/groups/userId/" + currentOrganization[0], {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setGroups(data);
        })
        .catch((err) => console.error(err));
    }
  }, [currentOrganization]);

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="nao" path="/">
            Générateur de cartes
          </Navbar.Brand>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link href="nao">Nao</Nav.Link>
            <Nav.Link href="#groups">Organizations</Nav.Link>
            <Nav.Link href="#cards">Cartes</Nav.Link>
            <Nav.Link href="login" path="/login">
              Se connecter
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div div className="container">
        <div className="headerBtn">
          <Dropdown onClick={getAllOrganization} className="dropdownButton">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {currentOrganization[1]}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {organisations.map((element) => (
                <Dropdown.Item
                  href="#/action-2"
                  key={element.id}
                  onClick={() =>
                    setCurrentOrganization([
                      element.id,
                      element.organizationName,
                    ])
                  }
                >
                  {element.organizationName}
                </Dropdown.Item>
              ))}
              <Dropdown.Item href="#/action-2">
                Créer une organisation
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button className="createOrgaBtn" variant="warning">
            Créer
          </Button>
        </div>
        <div className="groupsContent">
          <div className="groups">
            {groups.map((element) => (
              <h4 className="groupeName">{element.name}</h4>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Organizations;
