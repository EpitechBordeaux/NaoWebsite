import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./signin.css";
import MyNavbar from "../Navbar/navbar";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const data = {
    username: username,
    email: email,
    password: password,
  };

  function handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:5001/user/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 201) {
          navigate("/");
        }
        console.log(response.status);
      })
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }

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
              <label>Email</label>
              <input
                type="text"
                id="inputEmail"
                placeholder="email@epitech.eu"
                onChange={(newValue) => setEmail(newValue.target.value)}
                value={email}
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
                Tu as déjà un compte ?{" "}
                <Link className="linkRegister" to="/login">
                  Connecte toi
                </Link>
              </h4>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
