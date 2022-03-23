import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/nao_logo.jpg";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const data = {
    username: username,
    password: password,
  };

  function handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:5001/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          navigate("/");
        }
        console.log(response.status);
      })
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="nao" path="/">
            Générateur de cartes
          </Navbar.Brand>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link href="nao">Nao</Nav.Link>
            <Nav.Link href="groups">Groupes</Nav.Link>
            <Nav.Link href="#cards">Cartes</Nav.Link>
            <Nav.Link href="login" path="/login">
              Se connecter
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="mainlogin">
        <div className="loginContainer">
          <div className="rightSide">
            <div className="welcomeNote">
              <h2>Bienvenue</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <label>Nom d'utilisateur</label>
              <input
                type="text"
                id="inputUsername"
                placeholder="nom d'utilisateur"
                onChange={(newValue) => setUsername(newValue.target.value)}
                value={username}
              />
              <label>Mot de passe</label>
              <input
                type="password"
                id="inputPassword"
                placeholder="mot de passe"
                value={password}
                onChange={(newValue) => setPassword(newValue.target.value)}
              />
              <button
                type="submit"
                id="btnLogin"
                className="btn btn-primary mb-4 mt-4"
              >
                Connexion
              </button>
            </form>
            <footer className="footer">
              <h4>
                Tu n'as pas de compte ?{" "}
                <Link className="linkRegister" to="/signin">
                  Créer un compte
                </Link>
              </h4>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
