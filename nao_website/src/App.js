import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login/login";
import Home from "./components/Home/home";
import SignIn from "./components/SignIn/signin";
import Organizations from "./components/Organizations/organizations";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route exact path="/nao" element={<Home />} />
            <Route exact path="/login" href="login" element={<Login />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/organizations" element={<Organizations />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
