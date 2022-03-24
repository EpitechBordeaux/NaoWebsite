import React, { useEffect, useState } from "react";
import { Dropdown, Button } from "react-bootstrap";
import { MyContext } from "../../context/context";
import MyNavbar from "../Navbar/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./organization.css";

function Organizations() {
  const [organisations, setOrganisations] = useState([]);
  const [groups, setGroups] = useState([]);
  const [currentOrganization, setCurrentOrganization] = useState([
    -1,
    "Choisis une organisation",
  ]);
  const context = React.useContext(MyContext);

  const getAllOrganization = (event) => {
    event.preventDefault();
    fetch(
      "http://localhost:5001/organizations/userOrganisation/" + context.userId,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
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
    <>
      <MyNavbar />

      <div div className="container">
        <div className="headerBtn">
          <Dropdown onClick={getAllOrganization} className="dropdownButton">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {currentOrganization[1]}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {organisations.map((element, key) => (
                <Dropdown.Item
                  key={key}
                  href="#/action-2"
                  onClick={() =>
                    setCurrentOrganization([
                      element.organizationId,
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
              <h4 key={element.id} className="groupeName">
                {element.name}
              </h4>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Organizations;
