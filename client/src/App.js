import logo from "./logo.svg";
import "./App.css";
import LoginSignupPage from "./LoginSignupPage";
import Home from "./Home";
import "./Home.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route exact path="/" element={<LoginSignupPage />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
