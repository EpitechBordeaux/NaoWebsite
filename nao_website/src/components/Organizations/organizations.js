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

  const addUser = (id) => {
    const data = {
      userId: context.userId,
      organizationId: id[0].id,
      organizationName: id[0].organizationName,
    };
    fetch("http://localhost:5001/organizations/addUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error(err));
  };

  const findOrganizationId = (name) => {
    console.log("http://localhost:5001/organizations/" + name);
    fetch("http://localhost:5001/organizations/" + name, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        addUser(data);
      })
      .catch((err) => console.error(err));
  };

  const createOrganisation = () => {
    const data = {
      organizationName: "Adapei",
    };

    fetch("http://localhost:5001/organizations/addOrganization", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.organizationName);
        findOrganizationId(data.organizationName);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <MyNavbar />
      <div div className="containerOrganization">
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
              <Dropdown.Item
                href="#/action-2"
                onClick={() => createOrganisation()}
              >
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
