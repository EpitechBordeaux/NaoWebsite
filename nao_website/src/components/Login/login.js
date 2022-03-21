import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import logo from "../../images/nao_logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(email);
  console.log(password);

  const data = {
    username: "fuck",
    email: "fuck@camille",
    password: "cam",
  };

  function handleSubmit() {
    fetch("http://localhost:5001/user/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
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
            <label>Email</label>
            <input
              type="text"
              id="inputEmail"
              placeholder="email@example.com"
              onChange={(newValue) => setEmail(newValue.target.value)}
              value={email}
            />
            <label>Password</label>
            <input
              type="password"
              id="inputPassword"
              placeholder="password"
              value={password}
              onChange={(newValue) => setPassword(newValue.target.value)}
            />
            <button
              type="submit"
              id="btnLogin"
              className="btn btn-primary mb-2"
            >
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
