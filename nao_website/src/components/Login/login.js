import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../context/context";
import MyNavbar from "../Navbar/navbar";
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();
  const context = useContext(MyContext);
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
        return response.json();
      })
      .then((data) => {
        context.setUserName(data.userName);
        setCurrentUser(data.userName);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    if (currentUser !== "") {
      fetch("http://localhost:5001/user/" + currentUser, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          context.setUserId(data.result[0].id);
          navigate("/nao");
        })
        .catch((err) => console.error(err));
    }
  }, [currentUser]);

  return (
    <>
      <MyNavbar />

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
              <div className="btnConnexion">
                <button
                  type="submit"
                  id="btnLogin"
                  className="btn btn-primary mb-4 mt-4"
                >
                  Connexion
                </button>
              </div>
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
