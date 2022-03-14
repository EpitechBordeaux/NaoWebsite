import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { Form, Button } from "react-bootstrap";
import logo from "../../images/nao_logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="mainlogin">
      <div className="loginContainer">
        <div className="leftSide">
          <div className="welcomeImg">
            <img src={logo} alt="" srcSet="" id="logoNao" />
          </div>
        </div>
        <div className="rightSide">
          <div className="welcomeNote">
            <h2>Welcome back</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <label for="inputEmail">Email</label>
            <input
              type="text"
              class="form-control"
              id="inputEmail"
              placeholder="email@example.com"
              value={email}
              onChange={(newValue) => setEmail(newValue)}
            />
            <label for="inputPassword">Password</label>
            <input
              type="password"
              class="form-control"
              id="inputPassword"
              placeholder="Password"
              value={password}
              onChange={(newValue) => setPassword(newValue)}
            />
            <button type="submit" id="btnLogin" class="btn btn-primary mb-2">
              Login
            </button>
          </form>
          <footer className="footer">
            <h4>
              Don't have an account ?{" "}
              <Link className="linkRegister" to="/register">
                Register
              </Link>
            </h4>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Login;
