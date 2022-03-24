import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/context";
import Login from "./components/Login/login";
import Home from "./components/Home/home";
import SignIn from "./components/SignIn/signin";
import Organizations from "./components/Organizations/organizations";

function App() {
  return (
    <div>
      <ThemeProvider>
        <header>
          <Router>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/nao" element={<Home />} />
              <Route exact path="/login" href="login" element={<Login />} />
              <Route exact path="/signin" element={<SignIn />} />
              <Route
                exact
                href="organizations"
                path="/organizations"
                element={<Organizations />}
              />
            </Routes>
          </Router>
        </header>
      </ThemeProvider>
    </div>
  );
}

export default App;
