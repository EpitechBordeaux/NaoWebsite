import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login/login";
import Register from "./components/Register/register";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route
              exact
              path="/login"
              element={
                <div>
                  <Login />
                </div>
              }
            />
            <Route
              exact
              path="/register"
              element={
                <div>
                  <Register />
                </div>
              }
            />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
